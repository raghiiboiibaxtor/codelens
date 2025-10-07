# main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from mangum import Mangum
from rich.traceback import install

# Load environment variables
load_dotenv()

# Pretty traceback for debugging
install(show_locals=True)

# Create the FastAPI app
app = FastAPI(
    title="CodeLens API",
    description="An API that analyses code using Gemini AI and explains bugs or fixes.",
    version="1.0.0",
)

# Allow multiple origins (configure for prod later)
origins = [
    o.strip()
    for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Health + Root Routes ---
@app.get("/")
def root():
    """Simple root endpoint for quick service check."""
    return {
        "service": "codelens-api",
        "status": "ok",
        "routes": ["/health", "/investigate", "/docs"],
    }

@app.get("/health")
def health():
    """Health check endpoint."""
    return {"status": "ok"}

# --- Import and include routes ---
from routes import gemini_investigate
app.include_router(gemini_investigate.router)

# --- AWS Lambda adapter (optional for deployment) ---
lambda_handler = Mangum(app)
