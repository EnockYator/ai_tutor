from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

class TokenData(BaseModel):
    access_token: str
    token_type: str
    email: EmailStr | None = None

class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    role: str
    created_at: datetime
    
    @classmethod
    def from_orm(cls, user):
        return cls(
            id=UUID(user.id),
            full_name=user.name,
            email=user.email,
            created_at=user.created_at.isoformat()  # Convert datetime to string
        )
    
class LoginSchema(BaseModel):
    email: EmailStr
    password: str
    

class RegisterSchema(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str  # Should be "student" or "tutor"
    
    
class LogoutSchema(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True
        

