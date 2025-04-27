from sqlalchemy import Column, String, Text, JSON, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from sqlalchemy.orm import relationship
from database import Base # Import Base from database.py


class Question(Base):
    __tablename__ = 'questions'
    __table_args__ = {"info": {"skip_autogenerate": True}}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    cat_id = Column(UUID, ForeignKey('cats.id'), nullable=False)
    question_text = Column(String, nullable=False)
    options = Column(JSON, nullable=False)  # Store multiple choices
    correct_answer = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    cat = relationship("Cat", back_populates="questions")