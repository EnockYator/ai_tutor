from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from sqlalchemy.orm import relationship
from database import Base # Import Base from database.py

class Cat(Base):
    __tablename__ = 'cats'
    __table_args__ = {"info": {"skip_autogenerate": True}}
    
    id = Column(UUID, primary_key=True, default=uuid4)
    title = Column(String, nullable=False)
    course_id = Column(UUID, ForeignKey('courses.id'), nullable=False)
    tutor_id = Column(UUID, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    questions = relationship("Question", back_populates="cat") # General Questions
    cat_questions = relationship("CatQuestion", back_populates="cat") # CAT Questions
    cat_answers = relationship("CatAnswer", back_populates="cat") # CAT Answers
    attempts = relationship("CatAttempt", back_populates="cat")
    course = relationship("Course", back_populates="cats")
    