import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Declaring FastAPI route for python backend functionality
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOWED_ORIGIN", "*")],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Allowing multiple hosting origins (local/live)
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

# Lambda adapter
from mangum import Mangum
lambda_handler = Mangum(app)
