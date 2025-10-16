# rag_assist.py
from __future__ import annotations
import os
from typing import Dict, List
import chromadb
from chromadb.utils import embedding_functions
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

CHROMA_DIR   = os.getenv("CHROMA_DIR", "./chroma_store")
EMBED_MODEL  = os.getenv("EMBED_MODEL","sentence-transformers/all-MiniLM-L6-v2")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY","").strip()
OPENAI_PROJECT = os.getenv("OPENAI_PROJECT","").strip() or None
OPENAI_MODEL = os.getenv("OPENAI_MODEL","gpt-4o-mini").strip()

client_oa = OpenAI(api_key=OPENAI_API_KEY, project=OPENAI_PROJECT) if OPENAI_API_KEY else None

def _get_collection():
    emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name=EMBED_MODEL)
    pdb = chromadb.PersistentClient(path=CHROMA_DIR)
    return pdb.get_or_create_collection(name="annual_plan", embedding_function=emb_fn)

def retrieve(query: str, k=5, mmr=True) -> List[Dict]:
    coll = _get_collection()
    res = coll.query(query_texts=[query], n_results=k)
    docs = res.get("documents",[[]])[0]
    metas = res.get("metadatas",[[]])[0]
    out = []
    for d, m in zip(docs, metas):
        out.append({"text": d, "page": m.get("page"), "chunk": m.get("chunk"), "source": m.get("source")})
    return out

SYSTEM = """You are a maintenance planner assistant. 
Use ONLY the provided context to recommend tools/equipment and immediate steps.
Output in Korean. Keep it concise, actionable, and list concrete devices (e.g., 진동측정기, 정렬장비, 밸런싱기, 토크렌치, 베어링 풀러, 윤활 도구 등) with when/why.
If context is insufficient, say what additional info is needed.
Include page references when relevant.
"""

def build_question(ctx: Dict) -> str:
    # ctx: {"suspect": "misalignment", "mae": 123.4, "rpm": 1800, "asset":"펌프#2", "symptom":"베어링 과열" ...}
    suspect = ctx.get("suspect") or "rotating machinery anomaly"
    rpm = ctx.get("rpm")
    asset = ctx.get("asset","해당 설비")
    symptom = ctx.get("symptom","")
    q = f"{asset}에서 '{suspect}' 관련 이상 감지."
    if rpm: q += f" 현재 회전수 {rpm} RPM."
    if symptom: q += f" 증상: {symptom}."
    q += " 연간 점검계획(annual_plan.pdf) 기준으로 지금 어떤 기기/장비를 사용해 진단/조치해야 하는지, 점검 단계와 안전 유의사항까지 간단 목록으로."
    return q

def rag_recommend_devices(ctx: Dict, topk=5) -> Dict:
    question = build_question(ctx)
    hits = retrieve(question, k=topk)
    context = "\n\n".join([f"[p.{h['page']}] {h['text']}" for h in hits])

    prompt = f"""[질문]
{question}

[문서 컨텍스트]
{context}

[요청]
1) 몇번째 기기로 대체 운영해야하는지.
2) 선정 이유.
3) 찾을 수 없다면 없다고 말하라.
"""
    if not client_oa:
        # LLM 없이 컨텍스트만 반환(테스트용)
        return {"question": question, "answer": "(LLM disabled) 아래 컨텍스트 참고", "context": hits}

    resp = client_oa.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role":"system","content": SYSTEM},
            {"role":"user","content": prompt},
        ],
        temperature=0.2,
        max_tokens=700,
    )
    answer = resp.choices[0].message.content
    return {"question": question, "answer": answer, "context": hits}
