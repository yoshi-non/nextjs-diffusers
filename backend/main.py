from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# FastAPI
app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルート
@app.get("/")
async def root():
    return {"message": "Hello World"}