from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, Depends, Security
from fastapi.security import OAuth2PasswordBearer
from models import User
from schemas.auth_schema import RegisterSchema
from security import hash_password
from uuid import uuid4
from pydantic import EmailStr
import os
from database import get_db
from models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

# Password hash context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Find provided email in database
def get_user_in_db(db: Session, user_email: EmailStr):
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User does not exist")
    return user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Authenticate the user
def authenticate_user(db: Session, email: EmailStr, password: str):
    user = get_user_in_db(db, email)
    if not user: 
        raise HTTPException(status_code=404, detail="User does not exist")
    if not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect password")
    return user

# Create token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def register_user(user_data: RegisterSchema, db: Session):
    """Register a new user."""
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

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        role: str = payload.get("role")  # Extract role from token
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    
    user.role = role  # Ensure the role is available
    return user