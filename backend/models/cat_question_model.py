from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from uuid import uuid4
from database import Base # Import Base from database.py

class CatQuestion(Base):
    __tablename__ = "cat_questions"
    __table_args__ = {"info": {"skip_autogenerate": True}}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    cat_id = Column(UUID, ForeignKey('cats.id'), nullable=False)
    question_number = Column(Integer)  # e.g., 1, 2, 3
    question_text = Column(String)
    options = Column(JSON)  # {"A": "Option 1", "B": "Option 2", ...}
    correct_answer = Column(String)  # "A", "B", "C", or "D"
    topic = Column(String)  # e.g., "Algebra", "Calculus", "Geometry"

    cat = relationship("Cat", back_populates="cat_questions")
    answers = relationship("CatAnswer", back_populates="cat_question")
    