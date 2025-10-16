# llm_assist.py
from __future__ import annotations
import os, re, time, json
from typing import List, Dict, Optional, Tuple
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential


from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")  # 가벼운 기본값

CLIENT = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

RAW_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_API_KEY = RAW_KEY.strip()  # 앞뒤 공백 제거
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY가 설정되지 않았습니다(.env 확인).")

# ---- 검색 ----
ISO_DOMAINS = [
    "iso.org", "bsi.group", "ansi.org", "asq.org",
    "nist.gov", "iec.ch", "ieee.org", "ul.com"
]

print(f"[LLM] model={OPENAI_MODEL}, key_prefix={OPENAI_API_KEY[:7]}...")

def _is_preferred(url: str) -> bool:
    return any(d in url for d in ISO_DOMAINS)

@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=10))
def web_search_bing(q: str, top: int = 8) -> List[Dict]:
    key = os.getenv("BING_API_KEY")
    if not key:
        return []
    headers = {"Ocp-Apim-Subscription-Key": key}
    params = {"q": q, "count": top, "mkt": "en-US", "responseFilter": "Webpages"}
    with httpx.Client(timeout=15.0) as client:
        r = client.get("https://api.bing.microsoft.com/v7.0/search",
                       headers=headers, params=params)
        r.raise_for_status()
        data = r.json()
    items = []
    for it in data.get("webPages", {}).get("value", []):
        items.append({"title": it.get("name"), "url": it.get("url"),
                      "snippet": it.get("snippet", "")})
    # ISO/표준 도메인 가중치 정렬
    items.sort(key=lambda x: (not _is_preferred(x["url"])))
    return items

@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=10))
def web_search_serpapi(q: str, top: int = 8) -> List[Dict]:
    key = os.getenv("SERPAPI_KEY")
    if not key:
        return []
    with httpx.Client(timeout=15.0) as client:
        r = client.get("https://serpapi.com/search.json",
                       params={"engine": "google", "q": q, "num": top, "api_key": key})
        r.raise_for_status()
        data = r.json()
    items = []
    for it in data.get("organic_results", []):
        items.append({"title": it.get("title"), "url": it.get("link"),
                      "snippet": it.get("snippet", "")})
    items.sort(key=lambda x: (not _is_preferred(x["url"])))
    return items

def web_search(q: str, top: int = 8) -> List[Dict]:
    eng = os.getenv("SEARCH_ENGINE", "bing").lower()
    if eng == "serpapi":
        return web_search_serpapi(q, top)
    return web_search_bing(q, top)

# ---- 프롬프트 ----
SYSTEM_PROMPT = """You are an industrial reliability assistant.
- Use the provided search results as context to draft precise, safe, and actionable guidance.
- Prefer ISO/IEC/NIST/ANSI/BSI references; do not fabricate standards.
- If a standard is paywalled, cite its title/number and summarize only what is public.
- Present output in Korean, with short bullets, and include links (as-is).
"""

def build_user_prompt(context: Dict, results: List[Dict]) -> str:
    # context: {'mae': float, 'suspect': 'bearing'|'misalignment'|'unbalance'|..., 'features': {...}}
    lines = []
    lines.append(f"[알림] 이상감지: MAE={context.get('mae'):.3f}, 원인추정={context.get('suspect','unknown')}")
    lines.append("\n[검색결과 상위]")
    for i, it in enumerate(results[:6], 1):
        lines.append(f"{i}. {it['title']}  |  {it['url']}\n   - {it.get('snippet','')}")
    lines.append("""
요청:
1) 추정 원인에 맞춰 즉시 점검할 체크리스트 5~8개 (현장 작업자 관점).
2) 위험도/안전 유의사항 (잠재 손상·안전).
3) 표준/가이드 근거 요약(있으면 표준 번호·제목 명시), 링크 함께 표기.
4) 더 정확히 진단하기 위해 수집할 추가 신호/지표 3~5개.
5) 고장이 심각할 때의 격리/가동중지 판단 기준(보수적으로).
""")
    return "\n".join(lines)

# ---- 호출 ----
@retry(stop=stop_after_attempt(2), wait=wait_exponential(min=1, max=6))
def draft_mitigation(context: Dict) -> Dict:
    suspect = context.get("suspect") or "rotating machinery vibration anomaly"
    rpm = context.get("rpm")
    q = f"{suspect} ISO standard mitigation checklist vibration maintenance"
    if rpm:
        q += f" {rpm} rpm"
    results = web_search(q, top=8)

    user_prompt = build_user_prompt(context, results)
    resp = CLIENT.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.3,
        max_tokens=900,
    )
    text = resp.choices[0].message.content
    return {
        "query": q,
        "results": results[:8],
        "mitigation_kor": text,
    }
