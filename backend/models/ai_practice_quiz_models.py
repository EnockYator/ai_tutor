from sqlalchemy import Column, ForeignKey, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from database import Base # Import Base from database.py

class AIPracticeQuiz(Base):
    __tablename__ = 'ai_practice_quizzes'
    __table_args__ = {"info": {"skip_autogenerate": True}}
    
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    #topic_id = Column(UUID, ForeignKey('topics.id'))
    generated_questions = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)