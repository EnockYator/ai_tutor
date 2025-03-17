from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from services.user_service import add_user, get_user_by_id, get_user_by_email
from schemas.user_schema import UserCreate, UserResponse
from models import User
from database import get_db, SessionLocal

# Dependency to get a database session
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)


def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """Add a new user."""
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Call the actual service function
    return add_user(user_data, db)


@router.get("/{user_id}", response_model=UserResponse)
def fetch_user_by_id(user_id: str, db: Session = Depends(get_db)):
    """Get user details by ID."""
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/", response_model=UserResponse)
def fetch_user_by_email(user_email: str, db: Session = Depends(get_db)):
    """Get user details by email."""
    user = get_user_by_email(db, user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
