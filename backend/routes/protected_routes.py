from fastapi import APIRouter, Depends, HTTPException
from services.auth_service import get_current_user
from models import User

router = APIRouter(prefix="/protected", tags=["Protected"])


def check_role(user: User, required_role: str):
    if user.role != required_role:
        raise HTTPException(status_code=403, detail="Access forbidden")

@router.get("/tutor")
def lecturer_route(user: User = Depends(get_current_user)):
    check_role(user, "tutor")
    return {"message": "Welcome, Tutor!"}

@router.get("/student")
def student_route(user: User = Depends(get_current_user)):
    check_role(user, "student")
    return {"message": "Welcome, Student!"}
