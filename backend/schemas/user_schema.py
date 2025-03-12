from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from uuid import UUID

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str  # Should be one of: "student", "tutor", "parent", "admin"

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
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        from_attributes = True
        
