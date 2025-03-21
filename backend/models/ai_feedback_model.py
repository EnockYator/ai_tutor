from sqlalchemy import Column, ForeignKey, DateTime, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from database import Base # Import Base from database.py

class AIFeedback(Base):
    __tablename__ = 'ai_feedback'
    __table_args__ = {"info": {"skip_autogenerate": True}}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    question_id = Column(UUID, ForeignKey('questions.id'))
    feedback_text = Column(Text, nullable=False)
    recommended_topics = Column(JSON)
    generated_at = Column(DateTime, default=datetime.utcnow)