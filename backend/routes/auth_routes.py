from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models import User
from database import get_db, SessionLocal
from security import verify_password
from schemas.auth_schema import TokenData, UserLoginResponse, RegisterSchema, LogoutSchema, UserResponse
from services.auth_service import authenticate_user, register_user, create_access_token, get_current_user


# Dependency to get a database session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

router = APIRouter(prefix="/auth", tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Role-based access control decorator
def role_required(required_role: str):
    def decorator(user: User = Depends(get_current_user)):
        if user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this resource"
            )
        return user
    return decorator


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: RegisterSchema, db: Session = Depends(get_db)):
    """Register a new user"""
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Call the actual service function
    return register_user(user_data, db)


@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/login/", response_model=TokenData)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(user.id), "role": user.role})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": UserLoginResponse(
            email=user.email,
            role=user.role,
            full_name=user.full_name,
            id=user.id
        )
        }

@router.post("/logout")
async def logout():
    # FastAPI doesn't handle sessions by default, so logout is client-side
    return {"message": "Logout Successful"}


