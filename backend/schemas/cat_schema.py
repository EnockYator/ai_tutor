from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import List,Dict

class QuestionCreate(BaseModel):
    question_text: str
    options: List[str]
    correct_answer: str
    
    class Config:
        from_attributes = True


class QuestionResponse(QuestionCreate):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class CatCreate(BaseModel):
    title: str
    course_id: UUID
    questions: List[QuestionCreate]
    
    class Config:
        from_attributes = True


class CatResponse(BaseModel):
    id: UUID
    title: str
    course_id: UUID
    tutor_id: UUID
    created_at: datetime
    questions: List[QuestionResponse]

    class Config:
        from_attributes = True
        
        
        ### Cat Attempt Schema

class AttemptCreate(BaseModel):
    answers: Dict[int, str]  # question number -> answer choice
    
    class Config:
        from_attributes = True

class AttemptResponse(BaseModel):
    id: UUID
    cat_id: UUID
    student_id: UUID
    answers: Dict[int, str]
    score: float

    class Config:
        orm_mode = True
        from_attributes = True

class AnswerSubmission(BaseModel):
    question_id: str
    selected_answer: str
    
    class Config:
        from_attributes = True

class CatSubmissionSchema(BaseModel):
    cat_id: str
    answers: List[AnswerSubmission]
    
    class Config:
        from_attributes = True
