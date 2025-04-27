from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from uuid import uuid4
from database import Base # Import Base from database.py

class CatAnswer(Base):
    __tablename__ = "cat_answers"
    __table_args__ = {"info": {"skip_autogenerate": True}}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    cat_id = Column(UUID(as_uuid=True), ForeignKey("cats.id"), nullable=False)  # Link to CAT
    cat_attempt_id = Column(UUID, ForeignKey('cat_attempts.id'), nullable=False) # Link to attempt
    cat_question_id = Column(UUID, ForeignKey('cat_questions.id'), nullable=False) # Link to question
    selected_answer = Column(String)  # "A", "B", "C", or "D"
    is_correct = Column(Boolean)  # True or False

    cat_attempt = relationship("CatAttempt", back_populates="answers")
    cat_question = relationship("CatQuestion", back_populates="answers")
    cat = relationship("Cat", back_populates="cat_answers")
    