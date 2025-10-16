# app_streamlit.py
from __future__ import annotations

import os
import time
import pymysql
import pandas as pd
import matplotlib.pyplot as plt
import streamlit as st
from dotenv import load_dotenv

# -----------------------------
# 환경 변수 로드 & DB 설정
# -----------------------------
load_dotenv()

DB_CFG = dict(
    host=os.getenv("DB_HOST", "127.0.0.1"),
    port=int(os.getenv("DB_PORT", "3306")),
    user=os.getenv("DB_USER", "pms"),
    password=os.getenv("DB_PASSWORD", ""),
    database=os.getenv("DB_NAME", "pms"),
    cursorclass=pymysql.cursors.DictCursor,
)

# -----------------------------
# 커넥션 캐시 & 쿼리 유틸
# -----------------------------
@st.cache_resource(show_spinner=False)
def get_conn():
    # 캐시된 단일 커넥션을 재사용 (닫지 마세요!)
    return pymysql.connect(**DB_CFG)

def q(sql: str, args=None):
    """닫지 않는 커넥션으로 쿼리; 끊기면 재연결 후 재시도."""
    conn = get_conn()
    try:
        conn.ping(reconnect=True)
        with conn.cursor() as cur:
            cur.execute(sql, args or ())
            return cur.fetchall()
    except Exception:
        # 캐시 무효화 후 재연결
        get_conn.clear()
        conn = get_conn()
        conn.ping(reconnect=True)
        with conn.cursor() as cur:
            cur.execute(sql, args or ())
            return cur.fetchall()

@st.cache_data(ttl=30)
def table_columns(tbl: str):
    rows = q(f"SHOW COLUMNS FROM {tbl};")
    return [r["Field"] for r in rows]

# -----------------------------
# 페이지 설정 & 사이드바
# -----------------------------
st.set_page_config(page_title="PMS Monitoring", layout="wide")
st.title("PMS Monitoring Dashboard")

with st.sidebar:
    st.subheader("Controls")
    if st.button("🔄 Refresh now"):
        st.experimental_rerun()
    auto_sec = st.number_input("Auto refresh every (sec)", min_value=0, max_value=300, value=0, step=5)

if auto_sec and auto_sec > 0:
    last = st.session_state.get("_last_refresh_ts", 0.0)
    now = time.time()
    if now - last >= auto_sec:
        st.session_state["_last_refresh_ts"] = now
        st.experimental_rerun()

# -----------------------------
# 탭 구성
# -----------------------------
tab1, tab2, tab3 = st.tabs(["📊 Dashboard", "🔁 Retrain", "📚 History"])

# =========================================================
# 📊 Dashboard 탭
# =========================================================
with tab1:
    # ===== Realtime Charts (상단) =====
    st.subheader("Realtime Signals")

    MAX_POINTS = int(os.getenv("REALTIME_MAX_POINTS", "5000"))
    cols = table_columns("realtime_table")

    need_cols = ["time_rms", "fft_over_env"]
    missing = [c for c in need_cols if c not in cols]
    if missing:
        st.error(f"`realtime_table`에 필요한 컬럼이 없습니다: {', '.join(missing)}")
    else:
        # x축 후보는 그대로 두되, 축 라벨 텍스트는 고정("time", "frequency")
        time_candidates = ["time", "created_at", "ts", "timestamp", "dt"]
        freq_candidates = ["frequency", "freq", "fft_frequency", "fft_freq", "hz"]

        time_col = next((c for c in time_candidates if c in cols), None)
        freq_col = next((c for c in freq_candidates if c in cols), None)

        # SELECT 컬럼 (존재하는 것만)
        select_cols = []
        if time_col: select_cols.append(f"`{time_col}`")
        if freq_col: select_cols.append(f"`{freq_col}`")
        select_cols += ["`time_rms`", "`fft_over_env`"]
        select_sql = ", ".join(select_cols)

        # 정렬 우선순위: time_col → 그 외 후보
        sort_candidates = ([time_col] if time_col else []) + ["created_at", "id", "ts", "timestamp", "time", "dt", "seq", "offset"]
        sort_col = next((c for c in sort_candidates if c and c in cols), None)

        sql = f"SELECT {select_sql} FROM realtime_table "
        if sort_col:
            sql += f"ORDER BY `{sort_col}` ASC "
        sql += f"LIMIT {MAX_POINTS};"

        rows_rt = q(sql)

        if not rows_rt:
            st.info("realtime_table 비어있음")
        else:
            df_rt = pd.DataFrame(rows_rt)

            # 좌: x_time (가능하면 time 계열을 datetime으로), 없으면 index
            if time_col and time_col in df_rt.columns:
                df_rt[time_col] = pd.to_datetime(df_rt[time_col], errors="coerce")
                x_time = df_rt[time_col]
            else:
                x_time = pd.RangeIndex(start=0, stop=len(df_rt))

            # 우: x_freq (가능하면 frequency를 numeric으로), 없으면 index
            if freq_col and freq_col in df_rt.columns:
                df_rt[freq_col] = pd.to_numeric(df_rt[freq_col], errors="coerce")
                x_freq = df_rt[freq_col]
            else:
                x_freq = pd.RangeIndex(start=0, stop=len(df_rt))

            # y값 숫자화 & NaN 제거
            df_rt["time_rms"] = pd.to_numeric(df_rt["time_rms"], errors="coerce")
            df_rt["fft_over_env"] = pd.to_numeric(df_rt["fft_over_env"], errors="coerce")
            valid = df_rt["time_rms"].notna() & df_rt["fft_over_env"].notna()
            if time_col and time_col in df_rt.columns:
                valid &= df_rt[time_col].notna()
            if freq_col and freq_col in df_rt.columns:
                valid &= df_rt[freq_col].notna()
            df_rt = df_rt[valid].reset_index(drop=True)

            # 필터 후 x축 재지정
            if time_col and time_col in df_rt.columns:
                x_time = df_rt[time_col]
            else:
                x_time = pd.RangeIndex(start=0, stop=len(df_rt))
            if freq_col and freq_col in df_rt.columns:
                x_freq = df_rt[freq_col]
            else:
                x_freq = pd.RangeIndex(start=0, stop=len(df_rt))

            c1, c2 = st.columns(2)

            # --- 좌: Vrms vs Time (Line + grid) ---
            with c1:
                st.markdown("**Vrms - Time Domain**")
                fig1 = plt.figure(figsize=(6, 3))
                plt.plot(x_time, df_rt["time_rms"])
                plt.xlabel("time")          # ← 축 이름 고정
                plt.ylabel("Vrms")          # ← 축 이름 고정
                plt.grid(True, linestyle="--", alpha=0.5)
                plt.tight_layout()
                st.pyplot(fig1)

            # --- 우: Amplitude vs Frequency (Stem + grid) ---
            with c2:
                st.markdown("**Amplitude Spectrum - Freq Domain**")
                fig2 = plt.figure(figsize=(6, 3))
                # 호환: use_line_collection 인자 없이
                markerline, stemlines, baseline = plt.stem(x_freq, df_rt["fft_over_env"])
                try:
                    markerline.set_marker('.'); markerline.set_markersize(3)
                    baseline.set_linewidth(0.5)
                    try:
                        for l in stemlines:
                            l.set_linewidth(0.7)
                    except TypeError:
                        stemlines.set_linewidth(0.7)
                except Exception:
                    pass
                plt.xlabel("frequency")     # ← 축 이름 고정
                plt.ylabel("Amplitude")     # ← 축 이름 고정
                plt.grid(True, linestyle="--", alpha=0.5)
                plt.tight_layout()
                st.pyplot(fig2)

    st.divider()

    # ===== 최신 ISO / RAG 답변 (하단 카드) =====
    col1, col2 = st.columns(2)

    with col1:
        st.subheader("Latest ISO Advice")
        rows = q("""
            SELECT id, offset_idx, mae, suspect, query, result_markdown, created_at
            FROM pms_ai_advice
            ORDER BY id DESC
            LIMIT 1;
        """)
        if rows:
            r = rows[0]
            st.caption(
                f"ID #{r['id']} · offset {r['offset_idx']} · "
                f"MAE {float(r['mae']):.3f} · {r.get('suspect') or '-'} · {r['created_at']}"
            )
            st.markdown(r.get("result_markdown") or "_(empty)_")
        else:
            st.info("No ISO advice yet.")

    with col2:
        st.subheader("Latest RAG Advice")
        rows = q("""
            SELECT id, offset_idx, mae, suspect, answer_md, created_at
            FROM pms_ai_rag_advice
            ORDER BY id DESC
            LIMIT 1;
        """)
        if rows:
            r = rows[0]
            st.caption(
                f"ID #{r['id']} · offset {r['offset_idx']} · "
                f"MAE {float(r['mae']):.3f} · {r.get('suspect') or '-'} · {r['created_at']}"
            )
            st.markdown(r.get("answer_md") or "_(empty)_")
        else:
            st.info("No RAG advice yet.")

# =========================================================
# 🔁 Retrain 탭
# =========================================================
with tab2:
    st.subheader("Retrain Runs")

    runs = q("""
        SELECT id, started_at, ended_at, status, duration_sec, message
        FROM pms_retrain_log
        ORDER BY id DESC
        LIMIT 20;
    """)
    df = pd.DataFrame(runs)
    if not df.empty:
        st.dataframe(df, use_container_width=True, hide_index=True)
        sel = st.selectbox("Show details for log_id", df["id"].tolist())
        if sel:
            details = q("""
                SELECT seq, level, text, ts
                FROM pms_retrain_log_detail
                WHERE log_id=%s
                ORDER BY seq ASC;
            """, (sel,))
            st.write(f"### Log #{sel}")
            for d in details:
                st.markdown(f"- `{d['ts']}` **{d['level']}** · {d['text']}")
    else:
        st.info("No retrain logs yet.")

    st.divider()
    st.caption("수동 재학습 트리거 (FastAPI가 /retrain 제공 중일 때)")
    api_url = os.getenv("API_RETRAIN_URL", "http://127.0.0.1:8001/retrain")
    if st.button("Run Retrain via API"):
        import requests
        try:
            r = requests.post(api_url, timeout=8)
            st.success(f"Triggered: {r.status_code} {r.text[:300]}")
        except Exception as e:
            st.error(f"Trigger failed: {e}")

# =========================================================
# 📚 History 탭
# =========================================================
with tab3:
    st.subheader("ISO Advice History")
    rows = q("""
        SELECT id, offset_idx, mae, suspect,
               LEFT(result_markdown, 140) AS preview,
               created_at
        FROM pms_ai_advice
        ORDER BY id DESC
        LIMIT 100;
    """)
    st.dataframe(pd.DataFrame(rows), use_container_width=True, hide_index=True)

    st.subheader("RAG Advice History")
    rows = q("""
        SELECT id, offset_idx, mae, suspect,
               LEFT(answer_md, 140) AS preview,
               created_at
        FROM pms_ai_rag_advice
        ORDER BY id DESC
        LIMIT 100;
    """)
    st.dataframe(pd.DataFrame(rows), use_container_width=True, hide_index=True)


# from __future__ import annotations

# import os
# import time
# import pymysql
# import pandas as pd
# import matplotlib.pyplot as plt
# import streamlit as st
# from dotenv import load_dotenv

# # -----------------------------
# # 환경 변수 로드 & DB 설정
# # -----------------------------
# load_dotenv()

# DB_CFG = dict(
#     host=os.getenv("DB_HOST", "127.0.0.1"),
#     port=int(os.getenv("DB_PORT", "3306")),
#     user=os.getenv("DB_USER", "pms"),
#     password=os.getenv("DB_PASSWORD", ""),
#     database=os.getenv("DB_NAME", "pms"),
#     cursorclass=pymysql.cursors.DictCursor,
# )

# # -----------------------------
# # 커넥션 캐시 & 쿼리 유틸
# # -----------------------------
# @st.cache_resource(show_spinner=False)
# def get_conn():
#     # 캐시된 단일 커넥션을 재사용 (닫지 말 것!)
#     return pymysql.connect(**DB_CFG)

# def q(sql: str, args=None):
#     """닫지 않는 커넥션으로 쿼리; 끊기면 재연결 후 재시도."""
#     conn = get_conn()
#     try:
#         conn.ping(reconnect=True)
#         with conn.cursor() as cur:
#             cur.execute(sql, args or ())
#             return cur.fetchall()
#     except Exception:
#         # 캐시 무효화 후 재연결
#         get_conn.clear()
#         conn = get_conn()
#         conn.ping(reconnect=True)
#         with conn.cursor() as cur:
#             cur.execute(sql, args or ())
#             return cur.fetchall()

# @st.cache_data(ttl=30)
# def table_columns(tbl: str):
#     rows = q(f"SHOW COLUMNS FROM {tbl};")
#     return [r["Field"] for r in rows]

# # -----------------------------
# # 페이지 설정 & 사이드바
# # -----------------------------
# st.set_page_config(page_title="PMS Monitoring", layout="wide")
# st.title("PMS Monitoring Dashboard")

# with st.sidebar:
#     st.subheader("Controls")
#     # 수동 새로고침
#     if st.button("🔄 Refresh now"):
#         st.experimental_rerun()

#     # 자동 새로고침 간격(초). 0 = 비활성화
#     auto_sec = st.number_input("Auto refresh every (sec)", min_value=0, max_value=300, value=0, step=5)

# # 자동 새로고침 타이머
# if auto_sec and auto_sec > 0:
#     last = st.session_state.get("_last_refresh_ts", 0.0)
#     now = time.time()
#     if now - last >= auto_sec:
#         st.session_state["_last_refresh_ts"] = now
#         st.experimental_rerun()

# # -----------------------------
# # 탭 구성
# # -----------------------------
# tab1, tab2, tab3 = st.tabs(["📊 Dashboard", "🔁 Retrain", "📚 History"])

# # =========================================================
# # 📊 Dashboard 탭
# # =========================================================
# with tab1:
#     # ===== Realtime Charts (상단) =====
#     st.subheader("Realtime Signals")

#     MAX_POINTS = int(os.getenv("REALTIME_MAX_POINTS", "5000"))
#     cols = table_columns("realtime_table")

#     need_cols = ["time_rms", "fft_over_env"]
#     missing = [c for c in need_cols if c not in cols]
#     if missing:
#         st.error(f"`realtime_table`에 필요한 컬럼이 없습니다: {', '.join(missing)}")
#     else:
#         # 정렬 후보 중 존재하는 첫 번째 사용
#         sort_candidates = ["created_at", "id", "ts", "timestamp", "time", "dt", "seq", "offset"]
#         sort_col = next((c for c in sort_candidates if c in cols), None)

#         select_cols = []
#         if sort_col:
#             select_cols.append(f"`{sort_col}`")
#         select_cols += ["`time_rms`", "`fft_over_env`"]
#         select_sql = ", ".join(select_cols)

#         sql = f"SELECT {select_sql} FROM realtime_table "
#         if sort_col:
#             sql += f"ORDER BY `{sort_col}` ASC "
#         sql += f"LIMIT {MAX_POINTS};"

#         rows_rt = q(sql)
#         if not rows_rt:
#             st.info("realtime_table 비어있음")
#         else:
#             df_rt = pd.DataFrame(rows_rt)

#             # x축: 정렬 컬럼이 있으면 그걸로, 없으면 index
#             if sort_col and sort_col in df_rt.columns:
#                 x = df_rt[sort_col]
#             else:
#                 x = df_rt.index

#             # 숫자화 & NaN 제거
#             for c in ("time_rms", "fft_over_env"):
#                 df_rt[c] = pd.to_numeric(df_rt[c], errors="coerce")
#             df_rt = df_rt.dropna(subset=["time_rms", "fft_over_env"]).reset_index(drop=True)
#             if sort_col and sort_col in df_rt.columns:
#                 x = df_rt[sort_col]
#             else:
#                 x = df_rt.index

#             c1, c2 = st.columns(2)

#             # 좌: time_rms 선
#             with c1:
#                 st.markdown("**time_rms**")
#                 fig1 = plt.figure(figsize=(6, 3))
#                 plt.plot(x, df_rt["time_rms"])
#                 plt.xlabel(sort_col or "index")
#                 plt.ylabel("time_rms")
#                 plt.tight_layout()
#                 st.pyplot(fig1)

#             # 우: fft_over_env 콩나물(stem)
#             with c2:
#                 st.markdown("**fft_over_env**")
#                 fig2 = plt.figure(figsize=(6, 3))
#                 # 호환 버전: use_line_collection 인자 없이 호출
#                 markerline, stemlines, baseline = plt.stem(x, df_rt["fft_over_env"])
#                 # 콩나물 느낌 튜닝 (버전별 속성 유무를 대비해 try/except)
#                 try:
#                     markerline.set_marker('.')      # 마커 모양
#                     markerline.set_markersize(3)    # 마커 크기
#                     baseline.set_linewidth(0.5)     # 베이스라인 얇게
#                     # stem 선도 약간 얇게
#                     try:
#                         for l in stemlines:
#                             l.set_linewidth(0.7)
#                     except TypeError:
#                         stemlines.set_linewidth(0.7)  # 일부 버전에선 LineCollection 아님
#                 except Exception:
#                     pass
#                 plt.xlabel(sort_col or "index")
#                 plt.ylabel("fft_over_env")
#                 plt.tight_layout()
#                 st.pyplot(fig2)

#     st.divider()

#     # ===== 최신 ISO / RAG 답변 (하단 카드) =====
#     col1, col2 = st.columns(2)

#     with col1:
#         st.subheader("Latest ISO Advice")
#         rows = q("""
#             SELECT id, offset_idx, mae, suspect, query, result_markdown, created_at
#             FROM pms_ai_advice
#             ORDER BY id DESC
#             LIMIT 1;
#         """)
#         if rows:
#             r = rows[0]
#             st.caption(
#                 f"ID #{r['id']} · offset {r['offset_idx']} · "
#                 f"MAE {float(r['mae']):.3f} · {r.get('suspect') or '-'} · {r['created_at']}"
#             )
#             st.markdown(r.get("result_markdown") or "_(empty)_")
#         else:
#             st.info("No ISO advice yet.")

#     with col2:
#         st.subheader("Latest RAG Advice")
#         rows = q("""
#             SELECT id, offset_idx, mae, suspect, answer_md, created_at
#             FROM pms_ai_rag_advice
#             ORDER BY id DESC
#             LIMIT 1;
#         """)
#         if rows:
#             r = rows[0]
#             st.caption(
#                 f"ID #{r['id']} · offset {r['offset_idx']} · "
#                 f"MAE {float(r['mae']):.3f} · {r.get('suspect') or '-'} · {r['created_at']}"
#             )
#             st.markdown(r.get("answer_md") or "_(empty)_")
#         else:
#             st.info("No RAG advice yet.")

# # =========================================================
# # 🔁 Retrain 탭
# # =========================================================
# with tab2:
#     st.subheader("Retrain Runs")

#     runs = q("""
#         SELECT id, started_at, ended_at, status, duration_sec, message
#         FROM pms_retrain_log
#         ORDER BY id DESC
#         LIMIT 20;
#     """)
#     df = pd.DataFrame(runs)
#     if not df.empty:
#         st.dataframe(df, use_container_width=True, hide_index=True)
#         sel = st.selectbox("Show details for log_id", df["id"].tolist())
#         if sel:
#             details = q("""
#                 SELECT seq, level, text, ts
#                 FROM pms_retrain_log_detail
#                 WHERE log_id=%s
#                 ORDER BY seq ASC;
#             """, (sel,))
#             st.write(f"### Log #{sel}")
#             for d in details:
#                 st.markdown(f"- `{d['ts']}` **{d['level']}** · {d['text']}")
#     else:
#         st.info("No retrain logs yet.")

#     st.divider()
#     st.caption("수동 재학습 트리거 (FastAPI가 /retrain 제공 중일 때)")
#     api_url = os.getenv("API_RETRAIN_URL", "http://127.0.0.1:8001/retrain")
#     if st.button("Run Retrain via API"):
#         import requests
#         try:
#             r = requests.post(api_url, timeout=8)
#             st.success(f"Triggered: {r.status_code} {r.text[:300]}")
#         except Exception as e:
#             st.error(f"Trigger failed: {e}")

# # =========================================================
# # 📚 History 탭
# # =========================================================
# with tab3:
#     st.subheader("ISO Advice History")
#     rows = q("""
#         SELECT id, offset_idx, mae, suspect,
#                LEFT(result_markdown, 140) AS preview,
#                created_at
#         FROM pms_ai_advice
#         ORDER BY id DESC
#         LIMIT 100;
#     """)
#     st.dataframe(pd.DataFrame(rows), use_container_width=True, hide_index=True)

#     st.subheader("RAG Advice History")
#     rows = q("""
#         SELECT id, offset_idx, mae, suspect,
#                LEFT(answer_md, 140) AS preview,
#                created_at
#         FROM pms_ai_rag_advice
#         ORDER BY id DESC
#         LIMIT 100;
#     """)
#     st.dataframe(pd.DataFrame(rows), use_container_width=True, hide_index=True)