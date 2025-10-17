# server/app.py
from __future__ import annotations

import json
import markdown2
from fastapi.responses import HTMLResponse


import os
import re
# server/app.py 상단
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from pydantic import BaseModel

from anomaly_pipeline import (
    _guess_fault_type,         # 옵션 A에서 추가한 함수
    _save_llm_report,          # 옵션 A에서 추가한 함수
)
from llm_assist import draft_mitigation
from anomaly_pipeline import _db_connection

import asyncio
from typing import Optional, List

from openai import OpenAI

from fastapi import FastAPI, Query, HTTPException, BackgroundTasks
from pydantic import BaseModel

# === 기존 파이프라인 코드에서 함수/객체 재사용 ===
# 같은 프로젝트 루트에서 실행한다고 가정 (PYTHONPATH에 루트 추가되도록)
from anomaly_pipeline import (
    _db_connection,
    fetch_realtime_row_by_offset,
    run_autoencoder_inference,
    insert_ai_result,
    retrain_autoencoder_from_newtrain,
    load_model,
    load_scaler,
)

app = FastAPI(title="PMS Anomaly API", version="1.0.0")

@app.get("/debug/llm-key", summary="OPENAI 키/프로젝트 확인")
def debug_llm_key():
    key = os.getenv("OPENAI_API_KEY", "")
    proj = os.getenv("OPENAI_PROJECT", "")
    model = os.getenv("OPENAI_MODEL", "")
    # 숨은 문자/공백 검출
    info = {
        "key_prefix": key[:7] if key else "(none)",
        "key_len": len(key),
        "has_space": bool(re.search(r"\s", key)),
        "repr_tail_10": repr(key[-10:]) if key else "",
        "project": proj[:12] + ("..." if proj else ""),
        "model": model,
    }
    # 아주 짧은 live ping (모델 이름은 가벼운 걸로)
    try:
        client = OpenAI(api_key=key.strip(), project=(proj.strip() or None))
        r = client.chat.completions.create(
            model=(model or "gpt-4o-mini"),
            messages=[{"role":"user","content":"ping"}],
            max_tokens=4,
            temperature=0
        )
        info["ping"] = "ok"
        info["reply"] = r.choices[0].message.content
    except Exception as e:
        info["ping"] = f"fail: {type(e).__name__}"
        info["error"] = str(e)
        # 502로 친절히 반환
        raise HTTPException(status_code=502, detail=info)
    return info

# ---- 스키마 ----
class InferenceResult(BaseModel):
    offset: int
    mae: float
    mse_original: float
    mse_scaled: float
    anomaly: int        # 0/1
    threshold: float

class DetailedInference(InferenceResult):
    latent_vector: List[float]

# ---- 유틸 ----
def _get_realtime_count() -> int:
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) AS cnt FROM realtime_table;")
            return int(cur.fetchone()["cnt"])

# ---- 앱 라이프사이클 ----
@app.on_event("startup")
def _warmup():
    # 모델/스케일러 미리 로드 & DB 헬스체크
    load_model()
    load_scaler()
    try:
        _ = _get_realtime_count()
    except Exception as e:
        # 헬스체크에서 실패해도 앱은 떠있게, 대신 /health에서 노출
        print("[startup] DB check failed:", e)

# ---- 라우트 ----
@app.get("/health")
def health():
    try:
        cnt = _get_realtime_count()
        return {"status": "ok", "realtime_count": cnt}
    except Exception as e:
        return {"status": "degraded", "error": str(e)}

@app.get(
    "/inference/offset/{offset}",
    response_model=DetailedInference,
    summary="지정 offset(0-based)로 추론",
)
def infer_by_offset(offset: int):
    row = fetch_realtime_row_by_offset(offset)
    if row is None:
        raise HTTPException(status_code=404, detail=f"offset {offset} not found")

    out = run_autoencoder_inference(row)
    mae = out["mae_original"]
    anomaly = int(mae >= 50.0)  # anomaly_pipeline의 ANOMALY_THRESHOLD와 동일하게
    try:
        insert_ai_result(anomaly)
    except Exception as e:
        # 기록 실패는 응답엔 영향 없게
        print("[WARN] insert_ai_result failed:", e)

    return DetailedInference(
        offset=offset,
        mae=mae,
        mse_original=out["mse_original"],
        mse_scaled=out["mse_scaled"],
        anomaly=anomaly,
        threshold=50.0,
        latent_vector=out["latent_vector"].tolist(),
    )

@app.get(
    "/inference/latest",
    response_model=InferenceResult,
    summary="마지막(최신) 레코드로 추론",
)
def infer_latest():
    cnt = _get_realtime_count()
    if cnt == 0:
        raise HTTPException(status_code=404, detail="realtime_table empty")
    offset = cnt - 1
    row = fetch_realtime_row_by_offset(offset)
    if row is None:
        raise HTTPException(status_code=404, detail=f"offset {offset} not found")

    out = run_autoencoder_inference(row)
    mae = out["mae_original"]
    anomaly = int(mae >= 50.0)

    try:
        insert_ai_result(anomaly)
    except Exception as e:
        print("[WARN] insert_ai_result failed:", e)

    return InferenceResult(
        offset=offset,
        mae=mae,
        mse_original=out["mse_original"],
        mse_scaled=out["mse_scaled"],
        anomaly=anomaly,
        threshold=50.0,
    )

@app.post("/retrain", summary="newtrain_table 기반 재학습(백그라운드)")
def retrain(background: BackgroundTasks):
    # 오래 걸리므로 비동기 백그라운드로
    background.add_task(retrain_autoencoder_from_newtrain)
    return {"status": "queued"}

@app.get("/ai-result/latest", summary="최근 AI 판정 N개 조회")
def get_ai_results(n: int = Query(20, ge=1, le=200)):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, result, created_at FROM pms_ai_result "
                "ORDER BY id DESC LIMIT %s;", (n,)
            )
            rows = cur.fetchall()
    return rows

@app.get("/assist/anomaly")
def assist_anomaly(offset: int):
    row = fetch_realtime_row_by_offset(offset)
    if row is None:
        raise HTTPException(status_code=404, detail="offset not found")
    # 간단 추론 한번 돌려서 MAE/판정 얻기
    out = run_autoencoder_inference(row)
    ctx = {
        "mae": out["mae_original"],
        "suspect": None,  # 필요시 _guess_fault_type(row)
        "rpm": row.get("rpm"),
    }
    rep = draft_mitigation(ctx)
    return rep


class AdviceBrief(BaseModel):
    id: int
    offset_idx: int
    mae: float
    suspect: Optional[str] = None
    created_at: str

class AdviceDetail(AdviceBrief):
    query: Optional[str] = None
    result_markdown: Optional[str] = None
    

@app.get("/meta/realtime-count", summary="realtime_table 행수")
def realtime_count():
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) AS cnt FROM realtime_table;")
            return {"count": int(cur.fetchone()["cnt"])}


class AdviceBrief(BaseModel):
    id: int
    offset_idx: int
    mae: float
    suspect: Optional[str] = None
    created_at: str

class AdviceDetail(AdviceBrief):
    query: Optional[str] = None
    result_markdown: Optional[str] = None

# ---- 최신 N개 목록 ----
@app.get("/ai-advice/latest", response_model=List[AdviceBrief], summary="최근 LLM 대처안 목록")
def list_advice(n: int = Query(20, ge=1, le=200)):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, offset_idx, mae, suspect, created_at
                FROM pms_ai_advice
                ORDER BY id DESC
                LIMIT %s;
            """, (n,))
            rows = cur.fetchall()
    return [
        AdviceBrief(
            id=r["id"],
            offset_idx=r["offset_idx"],
            mae=float(r["mae"]),
            suspect=r.get("suspect"),
            created_at=str(r["created_at"]),
        ) for r in rows
    ]

# ---- 상세 조회 ----
@app.get("/ai-advice/{advice_id}", response_model=AdviceDetail, summary="LLM 대처안 상세")
def get_advice(advice_id: int):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, offset_idx, mae, suspect, query, result_markdown, created_at
                FROM pms_ai_advice WHERE id=%s;
            """, (advice_id,))
            r = cur.fetchone()
    if not r:
        raise HTTPException(404, "advice not found")
    return AdviceDetail(
        id=r["id"],
        offset_idx=r["offset_idx"],
        mae=float(r["mae"]),
        suspect=r.get("suspect"),
        query=r.get("query"),
        result_markdown=r.get("result_markdown"),
        created_at=str(r["created_at"]),
    )

# ---- 특정 offset 기준 최신 1개 ----
@app.get("/ai-advice/by-offset/{offset}", response_model=AdviceDetail, summary="특정 offset의 최신 대처안")
def get_advice_by_offset(offset: int):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, offset_idx, mae, suspect, query, result_markdown, created_at
                FROM pms_ai_advice
                WHERE offset_idx=%s
                ORDER BY id DESC
                LIMIT 1;
            """, (offset,))
            r = cur.fetchone()
    if not r:
        raise HTTPException(404, "no advice for given offset")
    return AdviceDetail(
        id=r["id"],
        offset_idx=r["offset_idx"],
        mae=float(r["mae"]),
        suspect=r.get("suspect"),
        query=r.get("query"),
        result_markdown=r.get("result_markdown"),
        created_at=str(r["created_at"]),
    )

# ---- 최근 X분 이내 생성된 것 ----
@app.get("/ai-advice/since", response_model=List[AdviceBrief], summary="최근 X분 동안의 대처안")
def list_since(minutes: int = Query(60, ge=1, le=24*60)):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, offset_idx, mae, suspect, created_at
                FROM pms_ai_advice
                WHERE created_at >= (NOW() - INTERVAL %s MINUTE)
                ORDER BY id DESC;
            """, (minutes,))
            rows = cur.fetchall()
    return [
        AdviceBrief(
            id=r["id"], offset_idx=r["offset_idx"], mae=float(r["mae"]),
            suspect=r.get("suspect"), created_at=str(r["created_at"])
        ) for r in rows
    ]


# === 응답 모델 ===
class RAGBrief(BaseModel):
    id: int
    offset_idx: int
    mae: float
    suspect: Optional[str] = None
    created_at: str

class RAGDetail(RAGBrief):
    answer_md: Optional[str] = None
    refs_json: Optional[str] = None

# === 조회 라우트 ===
@app.get("/rag/latest", response_model=List[RAGBrief], summary="최근 RAG 대처안 목록", operation_id="rag_list_latest")
def rag_list(n: int = Query(20, ge=1, le=200)):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
              SELECT id, offset_idx, mae, suspect, created_at
              FROM pms_ai_rag_advice
              ORDER BY id DESC LIMIT %s;
            """, (n,))
            rows = cur.fetchall()
    return [RAGBrief(
        id=r["id"], offset_idx=r["offset_idx"], mae=float(r["mae"]),
        suspect=r.get("suspect"), created_at=str(r["created_at"])
    ) for r in rows]

@app.get("/rag/{advice_id}", response_model=RAGDetail, summary="RAG 상세", operation_id="rag_get_detail")
def rag_detail(advice_id: int):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
              SELECT id, offset_idx, mae, suspect, answer_md, refs_json, created_at
              FROM pms_ai_rag_advice WHERE id=%s;
            """, (advice_id,))
            r = cur.fetchone()
    if not r:
        raise HTTPException(404, "not found")
    return RAGDetail(
        id=r["id"], offset_idx=r["offset_idx"], mae=float(r["mae"]),
        suspect=r.get("suspect"),
        answer_md=r.get("answer_md"),
        refs_json=r.get("refs_json"),
        created_at=str(r["created_at"])
    )

@app.get("/rag/by-offset/{offset}", response_model=RAGDetail, summary="특정 offset 최신 RAG", operation_id="rag_get_by_offset")
def rag_by_offset(offset: int):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
              SELECT id, offset_idx, mae, suspect, answer_md, refs_json, created_at
              FROM pms_ai_rag_advice
              WHERE offset_idx=%s
              ORDER BY id DESC
              LIMIT 1;
            """, (offset,))
            r = cur.fetchone()
    if not r:
        raise HTTPException(404, "no rag advice for given offset")
    return RAGDetail(
        id=r["id"], offset_idx=r["offset_idx"], mae=float(r["mae"]),
        suspect=r.get("suspect"),
        answer_md=r.get("answer_md"),
        refs_json=r.get("refs_json"),
        created_at=str(r["created_at"])
    )

@app.get("/rag/since", response_model=List[RAGBrief], summary="최근 X분 RAG", operation_id="rag_list_since")
def rag_since(minutes: int = Query(60, ge=1, le=24*60)):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
              SELECT id, offset_idx, mae, suspect, created_at
              FROM pms_ai_rag_advice
              WHERE created_at >= (NOW() - INTERVAL %s MINUTE)
              ORDER BY id DESC;
            """, (minutes,))
            rows = cur.fetchall()
    return [RAGBrief(
        id=r["id"], offset_idx=r["offset_idx"], mae=float(r["mae"]),
        suspect=r.get("suspect"), created_at=str(r["created_at"])
    ) for r in rows]

# (옵션) 마크다운 HTML 렌더
@app.get("/rag/render/{advice_id}", response_class=HTMLResponse, summary="RAG 결과 HTML", operation_id="rag_render_html")
def rag_render_html(advice_id: int):
    with _db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT answer_md FROM pms_ai_rag_advice WHERE id=%s;", (advice_id,))
            r = cur.fetchone()
    if not r or not r.get("answer_md"):
        raise HTTPException(404, "not found or empty")
    return f'<html><head><meta charset="utf-8"></head><body style="max-width:800px;margin:40px auto;font-family:system-ui">{markdown2.markdown(r["answer_md"])}</body></html>'