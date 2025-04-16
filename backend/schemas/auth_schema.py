from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime

class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True
    
    @classmethod
    def from_orm(cls, user):
        return cls(
            id=UUID(user.id),
            full_name=user.name,
            email=user.email,
            created_at=user.created_at.isoformat()  # Convert datetime to string
        )
        

class UserLoginResponse(BaseModel):
    email: EmailStr
    role: str
    full_name: str
    
    class Config:
        from_attributes = True
    
class TokenData(BaseModel):
    access_token: str
    token_type: str
    user: UserLoginResponse
    
    class Config:
        from_attributes = True

class LoginSchema(BaseModel):
    email: EmailStr
    password: str
    
    class Config:
        from_attributes = True
    

class RegisterSchema(BaseModel):
    full_name: str = Field(..., min_length=2, description="Full name must be at least 2 characters")
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")
    role: str = Field(..., pattern="^(student|tutor)$", description="Role must be either 'student' or 'tutor'")
    
    class Config:
        from_attributes = True
    
    
class LogoutSchema(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    role: str
    
    class Config:
        from_attributes = True
        

