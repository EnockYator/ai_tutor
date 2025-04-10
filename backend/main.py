import sys
import os
from fastapi import FastAPI, Depends
from database import Base, engine, get_db
from models import User
from routes import router as api_router #dynamic import
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ai_tutor", version="1.0")

# Create tables
Base.metadata.create_all(bind=engine) # Creates tables if they don’t exist

# Include routes
app.include_router(api_router, dependencies=[Depends(get_db)])

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React dev server
        # "https://production-domain.com"
    ],
    allow_credentials=True,  # Required for withCredentials
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "AI Tutor API is running!"}
