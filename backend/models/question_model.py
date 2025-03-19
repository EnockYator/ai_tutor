from sqlalchemy import Column, String, Text, JSON, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from database import Base # Import Base from database.py


class Question(Base):
    __tablename__ = 'questions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    assessment_id = Column(UUID, ForeignKey('assessments.id'))
    # topic_id = Column(UUID, ForeignKey('topics.id'))
    question_text = Column(Text, nullable=False)
    choices = Column(JSON)
    correct_answer = Column(String, nullable=False)