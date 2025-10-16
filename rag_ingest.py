# rag_ingest.py
from __future__ import annotations
import os, re, uuid
from pathlib import Path
import chromadb
from chromadb.utils import embedding_functions
from pypdf import PdfReader

CHROMA_DIR = os.getenv("CHROMA_DIR", "./chroma_store")
EMBED_MODEL = os.getenv("EMBED_MODEL","sentence-transformers/all-MiniLM-L6-v2")
PDF_PATH    = os.getenv("ANNUAL_PLAN_PDF","./docs/annual_plan.pdf")

def load_pdf_text(pdf_path: str):
    reader = PdfReader(pdf_path)
    pages = []
    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        # 공백 정리
        text = re.sub(r"[ \t]+", " ", text).strip()
        if text:
            pages.append((i, text))
    return pages  # list[(page, text)]

def chunk_text(text: str, chunk_size=700, overlap=120):
    tokens = text.split()
    chunks = []
    i = 0
    while i < len(tokens):
        chunk = tokens[i:i+chunk_size]
        chunks.append(" ".join(chunk))
        i += (chunk_size - overlap)
    return chunks

def ingest():
    emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name=EMBED_MODEL)
    client = chromadb.PersistentClient(path=CHROMA_DIR)

    # ★ 컬렉션 리셋
    try:
        client.delete_collection("annual_plan")
    except Exception:
        pass
    coll = client.create_collection(name="annual_plan", embedding_function=emb_fn)

    pages = load_pdf_text(PDF_PATH)
    print(f"[RAG] pages={len(pages)}  path={os.path.abspath(PDF_PATH)}")
    if not pages:
        raise RuntimeError("PDF에서 텍스트를 한 줄도 추출하지 못했습니다. (스캔본이면 OCR 필요)")

    docs, ids, metas = [], [], []
    for page, text in pages:
        for idx, chunk in enumerate(chunk_text(text)):
            docs.append(chunk)
            ids.append(str(uuid.uuid4()))
            metas.append({"source":"annual_plan.pdf", "page":page, "chunk":idx})

    coll.add(documents=docs, ids=ids, metadatas=metas)
    print(f"[RAG] indexed {len(docs)} chunks → {CHROMA_DIR}/annual_plan")


if __name__ == "__main__":
    ingest()
