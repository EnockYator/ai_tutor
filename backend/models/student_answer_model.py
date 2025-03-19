from sqlalchemy import Column, String, Text, JSON, DateTime, Enum, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from database import Base # Import Base from database.py

class StudentAnswer(Base):
    __tablename__ = 'student_answers'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    question_id = Column(UUID, ForeignKey('questions.id'))
    selected_answer = Column(String)
    is_correct = Column(Boolean)
    submitted_at = Column(DateTime, default=datetime.utcnow)