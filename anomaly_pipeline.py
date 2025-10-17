from __future__ import annotations

import threading
from llm_assist import draft_mitigation

LLM_COOLDOWN_SEC = 300  # 5분
_last_llm_ts = 0.0

from rag_assist import rag_recommend_devices

import os
import sys
import time
from contextlib import contextmanager
from decimal import Decimal
from functools import lru_cache
from pathlib import Path
from typing import Dict, List, Optional

import joblib
import numpy as np
import pandas as pd
import pymysql
import torch
import torch.nn as nn
import torch.optim as optim
from dotenv import load_dotenv
from pymysql.cursors import DictCursor
from torch.utils.data import DataLoader

load_dotenv()

ROOT_DIR = Path(__file__).resolve().parent
PMS_MASTER_DIR = ROOT_DIR / "PMS-master"
AUTO_ENCODER_DIR = PMS_MASTER_DIR / "auto_encoder"
NEW_MODEL_DIR = ROOT_DIR / "new_model"
DEFAULT_MODEL_PATH = AUTO_ENCODER_DIR / "normal_train.model"
DEFAULT_SCALER_PATH = AUTO_ENCODER_DIR / "scaler.joblib"

if not PMS_MASTER_DIR.exists():
    raise FileNotFoundError(f"PMS-master 디렉터리를 찾을 수 없습니다: {PMS_MASTER_DIR}")

sys.path.insert(0, str(PMS_MASTER_DIR))
sys.path.insert(0, str(AUTO_ENCODER_DIR))

try:
    from auto_encoder.make_torch import X_FILTER, df2torch, stdScaling
    from auto_encoder.model import AutoEncoder
except ModuleNotFoundError as exc:  # pragma: no cover
    raise ImportError(
        "auto_encoder 모듈을 불러올 수 없습니다. PMS-master 경로를 확인하세요."
    ) from exc


DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
HIDDEN_DIM = 32
LATENT_DIM = 8
BATCH_SIZE = 8
NUM_EPOCHS = 100
LEARNING_RATE = 5e-3
ANOMALY_THRESHOLD = 50.0  # MAE 기준
SLEEP_SECONDS = 60
DROP_TAIL_COLUMNS = 9


def resolve_model_path() -> Path:
    candidate = NEW_MODEL_DIR / "normal_train.model"
    if candidate.exists():
        return candidate
    if DEFAULT_MODEL_PATH.exists():
        return DEFAULT_MODEL_PATH
    raise FileNotFoundError("사용 가능한 AutoEncoder 가중치 파일을 찾지 못했습니다.")


def resolve_scaler_path() -> Path:
    candidate = NEW_MODEL_DIR / "scaler.joblib"
    if candidate.exists():
        return candidate
    if DEFAULT_SCALER_PATH.exists():
        return DEFAULT_SCALER_PATH
    raise FileNotFoundError("사용 가능한 스케일러 파일을 찾지 못했습니다.")


def _get_db_config() -> Dict[str, str]:
    """Collect database connection parameters from environment variables."""
    config = {
        "host": os.getenv("DB_HOST", "localhost"),
        "port": int(os.getenv("DB_PORT", "3306")),
        "user": os.getenv("DB_USER", "pms"),
        "password": os.getenv("DB_PASSWORD", ""),
        "database": os.getenv("DB_NAME", "pms"),
    }
    # 어디로 붙을지 로그
    print(f"[DB-CONFIG] host={config['host']} port={config['port']} db={config['database']}")
    missing = [key for key, value in config.items() if key != "port" and (value in ("", None))]
    if missing:
        raise RuntimeError(f"다음 DB 환경 변수가 설정되지 않았습니다: {', '.join(missing)}")
    return config


@contextmanager
def _db_connection():
    conn = pymysql.connect(cursorclass=DictCursor, **_get_db_config())
    try:
        yield conn
    finally:
        conn.close()


def _save_llm_report(offset: int, mae: float, suspect: Optional[str], report: Dict) -> None:
    create_sql = """
    CREATE TABLE IF NOT EXISTS pms_ai_advice (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offset_idx INT NOT NULL,
        mae DOUBLE NOT NULL,
        suspect VARCHAR(64) NULL,
        query TEXT,
        result_markdown MEDIUMTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at),
        INDEX idx_offset (offset_idx)
    );
    """
    insert_sql = """
    INSERT INTO pms_ai_advice (offset_idx, mae, suspect, query, result_markdown)
    VALUES (%s, %s, %s, %s, %s);
    """
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(create_sql)
            cur.execute(insert_sql, (
                offset, mae, suspect,
                report.get("query", ""),
                report.get("mitigation_kor", "")
            ))
        conn.commit()


def _guess_fault_type(row: Dict[str, object]) -> Optional[str]:
    for k in ["bearing", "misalignment", "unbalance", "rotor", "cavitation", "vane"]:
        try:
            if float(row.get(k, 0)) > 0.5:
                return k
        except Exception:
            pass
    return None


def _trigger_llm_async(row: Dict[str, object], mae: float, offset: int):
    """한 번이라도 이상이면 백그라운드로 LLM 실행 + 저장 (쿨다운 포함)"""
    global _last_llm_ts
    now = time.time()
    if now - _last_llm_ts < LLM_COOLDOWN_SEC:
        return
    _last_llm_ts = now

    def _job():
        try:
            suspect = _guess_fault_type(row)
            ctx = {"mae": mae, "suspect": suspect, "rpm": row.get("rpm")}
            report = draft_mitigation(ctx)
            print("[LLM-Assist] query:", report.get("query"))
            print("[LLM-Assist] 요약:\n", report.get("mitigation_kor", "")[:400], "...\n")
            _save_llm_report(offset, mae, suspect, report)
        except Exception as e:
            print("[LLM-Assist][ERROR]", e)

    threading.Thread(target=_job, daemon=True).start()

def debug_db_snapshot():
    """현재 연결된 DB/포트/행수/샘플 확인용"""
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT DATABASE() AS db, @@port AS port, @@hostname AS host;")
            print("[DB] info:", cur.fetchone())
            cur.execute("SELECT COUNT(*) AS cnt FROM newtrain_table;")
            print("[DB] newtrain_table COUNT:", cur.fetchone())
            cur.execute("SELECT * FROM newtrain_table LIMIT 3;")
            rows = cur.fetchall()
            print("[DB] newtrain_table SAMPLE(3) keys:", list(rows[0].keys()) if rows else [])
            for r in rows:
                # 앞 5개 컬럼만 프린트
                items = list(r.items())[:5]
                print("   ", items)

def fetch_realtime_row_by_offset(offset: int) -> Optional[Dict[str, object]]:
    """
    realtime_table에서 주어진 offset에 해당하는 레코드를 반환한다.
    offset은 0 기반 인덱스이다.
    """
    query = "SELECT * FROM realtime_table LIMIT %s, 1;"
    with _db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (offset,))
            return cursor.fetchone()


def fetch_first_realtime_row() -> Optional[Dict[str, object]]:
    return fetch_realtime_row_by_offset(0)


def fetch_first_realtime_array(
    drop_last: int = 0, dtype: Optional[np.dtype] = np.float32
) -> Optional[np.ndarray]:
    row = fetch_first_realtime_row()
    if row is None:
        return None

    values = []
    for key in sorted(row.keys()):
        values.append(row[key])
    if drop_last > 0:
        values = values[:-drop_last] if drop_last <= len(values) else []

    try:
        return np.asarray(values, dtype=dtype)
    except (ValueError, TypeError):
        return np.asarray(values, dtype=object)


def _to_float(value: object) -> float:
    if isinstance(value, Decimal):
        return float(value)
    if isinstance(value, (int, float)):
        return float(value)
    try:
        return float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"숫자로 변환할 수 없습니다: {value!r}") from exc


def prepare_feature_dataframe(row: Dict[str, object]) -> pd.DataFrame:
    """Convert a realtime_table row into a DataFrame aligned with X_FILTER."""
    missing = [col for col in X_FILTER if col not in row]
    if missing:
        raise KeyError(f"realtime_table에 다음 컬럼이 없습니다: {', '.join(missing)}")

    values = [_to_float(row[col]) for col in X_FILTER]
    return pd.DataFrame([values], columns=X_FILTER)


@lru_cache(maxsize=1)
def load_scaler():
    scaler_path = resolve_scaler_path()
    return joblib.load(scaler_path)


@lru_cache(maxsize=1)
def load_model():
    model_path = resolve_model_path()
    model = AutoEncoder(len(X_FILTER), HIDDEN_DIM, LATENT_DIM)
    state_dict = torch.load(model_path, map_location=DEVICE)
    model.load_state_dict(state_dict)
    model.to(DEVICE)
    model.eval()
    return model


def run_autoencoder_inference(row: Dict[str, object]) -> Dict[str, np.ndarray]:
    """
    단일 샘플에 대해 AutoEncoder 추론을 수행하고 결과를 반환.
    """
    feature_df = prepare_feature_dataframe(row)
    scaler = load_scaler()
    scaled_array = scaler.scaling(feature_df)
    scaled_df = pd.DataFrame(scaled_array, columns=X_FILTER)

    tensor = df2torch(scaled_df).to(DEVICE)
    model = load_model()

    with torch.no_grad():
        latent, recon = model(tensor)

    scaled_input = tensor.cpu().numpy()[0]
    scaled_recon = recon.cpu().numpy()[0]
    scaled_diff = scaled_input - scaled_recon
    latent_vec = latent.cpu().numpy()[0]
    mse_scaled = float(np.mean(scaled_diff ** 2))

    original_input = scaler.scaler.inverse_transform(scaled_input.reshape(1, -1))[0]
    original_recon = scaler.scaler.inverse_transform(scaled_recon.reshape(1, -1))[0]
    original_diff = original_input - original_recon
    mse_original = float(np.mean(original_diff ** 2))
    mae_original = float(np.mean(np.abs(original_diff)))

    return {
        "scaled_input": scaled_input,
        "scaled_reconstruction": scaled_recon,
        "scaled_difference": scaled_diff,
        "original_input": original_input,
        "original_reconstruction": original_recon,
        "original_difference": original_diff,
        "latent_vector": latent_vec,
        "mse_scaled": mse_scaled,
        "mse_original": mse_original,
        "mae_original": mae_original,
    }


def insert_ai_result(result_flag: int) -> None:
    """pms_ai_result 테이블에 분석 결과를 저장한다."""
    create_query = """
        CREATE TABLE IF NOT EXISTS pms_ai_result (
            id INT AUTO_INCREMENT PRIMARY KEY,
            result TINYINT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """
    query = "INSERT INTO pms_ai_result (result) VALUES (%s);"
    with _db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(create_query)
            cursor.execute(query, (result_flag,))
        conn.commit()

def load_newtrain_features() -> pd.DataFrame:
    """
    newtrain_table에서 재학습용 피처를 '그대로' 읽는다.
    - pandas.read_sql 대신 cursor.fetchall()로 안전하게 가져옴
    - 전 컬럼 numeric dtype 강제 확인
    """
    # 1) 컬럼 존재 확인
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SHOW COLUMNS FROM newtrain_table;")
            existing_cols = [row["Field"] for row in cur.fetchall()]
    missing = [c for c in X_FILTER if c not in existing_cols]
    if missing:
        raise KeyError(f"newtrain_table에서 다음 컬럼을 찾을 수 없습니다: {', '.join(missing)}")

    # 2) SELECT (그대로)
    select_list = ", ".join(f"`{c}`" for c in X_FILTER)
    query = f"SELECT {select_list} FROM newtrain_table;"

    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query)
            rows = cur.fetchall()              # list[dict]
    if not rows:
        raise ValueError("newtrain_table에 데이터가 없습니다.")

    # 3) DataFrame 구성 (열 순서 고정)
    df = pd.DataFrame(rows, columns=X_FILTER)

    # 4) 숫자형 보장 (문자 있으면 바로 위치 보여주고 실패)
    for c in df.columns:
        if not pd.api.types.is_numeric_dtype(df[c]):
            try:
                df[c] = pd.to_numeric(df[c], errors="raise")
            except Exception:
                bad = df[c].astype(str).head(5).tolist()
                raise ValueError(f"[재학습] '{c}' 컬럼이 숫자로 변환되지 않습니다. 예시: {bad}")

    # 5) NaN 행 제거
    invalid_rows = df.isna().any(axis=1)
    dropped = int(invalid_rows.sum())
    if dropped > 0:
        print(f"[재학습] NaN 포함 행 {dropped}개를 제외합니다.")
        df = df[~invalid_rows]

    if df.empty:
        raise ValueError("newtrain_table에 유효한 숫자 데이터가 없습니다.")
    return df.reset_index(drop=True)


def main_loop(interval_seconds: int = SLEEP_SECONDS) -> None:
    """1분 주기로 realtime_table을 순차 처리하고 이상 여부를 판정한다."""
    row_offset = 0
    anomaly_streak = 0

    print(f"[파이프라인] {interval_seconds}초 주기로 실시간 데이터를 처리합니다. (Ctrl+C 종료)")

    while True:
        try:
            row = fetch_realtime_row_by_offset(row_offset)
            if row is None:
                print("[파이프라인] 새로운 데이터가 없습니다. 대기 중...")
                time.sleep(interval_seconds)
                continue

            inference = run_autoencoder_inference(row)
            mae = inference["mae_original"]
            anomaly_flag = int(mae >= ANOMALY_THRESHOLD)

            insert_ai_result(anomaly_flag)
            print(
                f"[파이프라인] RowOffset={row_offset}, MAE={mae:.3f}, "
                f"Anomaly={anomaly_flag}, Streak={anomaly_streak + anomaly_flag}"
            )

            if anomaly_flag:
                anomaly_streak += 1
                _trigger_llm_async(row, mae, row_offset)
            else:
                anomaly_streak = 0

            if anomaly_streak >= 3:
                print("[파이프라인] 이상 징후 3회 연속 감지 → 재학습을 실행합니다.")
                # retrain_autoencoder_from_newtrain()
                run_retrain_with_logging()
                anomaly_streak = 0

            row_offset += 1
            time.sleep(interval_seconds)
        except KeyboardInterrupt:
            print("\n[파이프라인] 사용자 요청으로 종료합니다.")
            break
        except Exception as exc:
            print(f"[파이프라인] 처리 중 오류 발생: {exc}")
            time.sleep(interval_seconds)


def _save_rag(offset: int, mae: float, suspect: Optional[str], report: Dict) -> None:
    create_sql = """
    CREATE TABLE IF NOT EXISTS pms_ai_rag_advice (
        id INT AUTO_INCREMENT PRIMARY KEY,
        offset_idx INT NOT NULL,
        mae DOUBLE NOT NULL,
        suspect VARCHAR(64) NULL,
        answer_md MEDIUMTEXT,
        refs_json MEDIUMTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at),
        INDEX idx_offset (offset_idx)
    );
    """
    insert_sql = """
    INSERT INTO pms_ai_rag_advice (offset_idx, mae, suspect, answer_md, refs_json)
    VALUES (%s, %s, %s, %s, %s);
    """
    import json
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(create_sql)
            cur.execute(insert_sql, (
                offset, mae, suspect,
                report.get("answer",""),
                json.dumps(report.get("context",[]), ensure_ascii=False)
            ))
        conn.commit()

# _trigger_llm_async 내부에 병렬 호출 추가(또는 별도 스레드)
def _trigger_llm_async(row: Dict[str, object], mae: float, offset: int):
    # ... (기존 ISO 검색 LLM 스레드) ...
    def _job_rag():
        try:
            suspect = _guess_fault_type(row)
            ctx = {"suspect": suspect, "mae": mae, "rpm": row.get("rpm"), "asset": row.get("asset_name")}
            rep = rag_recommend_devices(ctx, topk=5)
            _save_rag(offset, mae, suspect, rep)
            print("[RAG] saved advice for offset", offset)
        except Exception as e:
            print("[RAG][ERROR]", e)
    threading.Thread(target=_job_rag, daemon=True).start()


# === [추가] 재학습 로깅 유틸 ===
def _retrain_log_start() -> int:
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO pms_retrain_log (status) VALUES ('running');")
            log_id = cur.lastrowid
        conn.commit()
    return int(log_id)

def _retrain_log_append(log_id: int, text: str, level: str = "INFO", seq_cache={"n":0}):
    seq_cache["n"] += 1
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO pms_retrain_log_detail (log_id, seq, level, text) VALUES (%s,%s,%s,%s);",
                (log_id, seq_cache["n"], level, text[:65535])
            )
        conn.commit()

def _retrain_log_finish(log_id: int, status: str, msg: str = ""):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE pms_retrain_log
                SET status=%s, ended_at=NOW(), duration_sec=TIME_TO_SEC(TIMEDIFF(NOW(), started_at)), message=%s
                WHERE id=%s;
            """, (status, msg[:255], log_id))
        conn.commit()

def run_retrain_with_logging():
    log_id = _retrain_log_start()
    try:
        _retrain_log_append(log_id, "[재학습] 시작")
        feature_df = load_newtrain_features()
        _retrain_log_append(log_id, f"[재학습] 데이터 로드 OK: shape={feature_df.shape}")

        scaler_wrapper = stdScaling(feature_df)
        scaled_array = scaler_wrapper.scaling(feature_df)
        tensor_dataset = torch.tensor(scaled_array, dtype=torch.float32)
        train_loader = DataLoader(tensor_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0, drop_last=False)

        model = AutoEncoder(len(X_FILTER), HIDDEN_DIM, LATENT_DIM).to(DEVICE)
        criterion = nn.MSELoss()
        optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)

        for epoch in range(NUM_EPOCHS):
            model.train()
            epoch_loss = 0.0
            for batch in train_loader:
                batch = batch.to(DEVICE)
                _, outputs = model(batch)
                loss = criterion(outputs, batch)
                optimizer.zero_grad(); loss.backward(); optimizer.step()
                epoch_loss += loss.item() * batch.size(0)

            epoch_loss /= len(train_loader.dataset)
            if (epoch+1) % 10 == 0 or epoch == 0:
                _retrain_log_append(log_id, f"[재학습] Epoch {epoch+1}/{NUM_EPOCHS}, Loss={epoch_loss:.6f}")

        NEW_MODEL_DIR.mkdir(parents=True, exist_ok=True)
        joblib.dump(scaler_wrapper, NEW_MODEL_DIR / "scaler.joblib")
        torch.save(model.cpu().state_dict(), NEW_MODEL_DIR / "normal_train.model")
        load_scaler.cache_clear(); load_model.cache_clear()

        _retrain_log_append(log_id, "[재학습] 모델/스케일러 저장 완료")
        _retrain_log_finish(log_id, "success", "ok")
    except Exception as e:
        _retrain_log_append(log_id, f"[에러] {repr(e)}", "ERROR")
        _retrain_log_finish(log_id, "failed", str(e))
        raise


if __name__ == "__main__":
    debug_db_snapshot()
    main_loop()