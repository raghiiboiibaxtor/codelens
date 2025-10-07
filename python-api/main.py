import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from mangum import Mangum

load_dotenv()

app = FastAPI()

# Allow multiple origins (local + S3 later)
origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"service": "codelens-api", "status": "ok", "routes": ["/health", "/investigate", "/docs"]}

@app.get("/health")
def health():
    return {"status": "ok"}

# (stub) input capture endpoint – wire frontend now; add Gemini next
from pydantic import BaseModel
class AnalyzeIn(BaseModel):
    code: str

@app.post("/investigate")
def investigate(p: AnalyzeIn):
    return {"received": len(p.code), "preview": p.code[:120]}

# Lambda adapter (for later deploy)
lambda_handler = Mangum(app)
