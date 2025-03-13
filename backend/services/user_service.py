from sqlalchemy.orm import Session
from models.user_model import User
from schemas.user_schema import UserCreate
import uuid
from uuid import uuid4
from fastapi import HTTPException
from security import hash_password
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def add_user(user_data: UserCreate, db: Session):
    """Creates a new user with a hashed password."""
    new_user = User(
        id=uuid4(),
        full_name=user_data.full_name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        role=user_data.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_by_email(db: Session, user_email: str):
    """Fetch a user by email."""
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user



def get_user_by_id(db, user_id: str):
    """Fetch a user by id."""
    try:
        user_uuid = uuid.UUID(user_id) # Convert string to UUID
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    user = db.query(User).filter(User.id == user_uuid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
