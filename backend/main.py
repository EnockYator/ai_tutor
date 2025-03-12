import sys
import os
from fastapi import FastAPI
from database import Base, engine
from models import User
from routes import router as api_router #dynamic import

app = FastAPI(title="ai_tutor", version="1.0")

# Create tables
Base.metadata.create_all(bind=engine) # Creates tables if they don’t exist

# Include routes
app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "AI Tutor API is running!"}
