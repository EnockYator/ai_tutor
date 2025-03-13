import sys
import os
from fastapi import FastAPI, Depends
from database import Base, engine, get_db
from models import User
from routes import router as api_router #dynamic import

app = FastAPI(title="ai_tutor", version="1.0")

# Create tables
Base.metadata.create_all(bind=engine) # Creates tables if they don’t exist

# Include routes
app.include_router(api_router, dependencies=[Depends(get_db)])

@app.get("/")
def root():
    return {"message": "AI Tutor API is running!"}
