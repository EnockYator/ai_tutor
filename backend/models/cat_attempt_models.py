from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Boolean, Float
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from uuid import uuid4
from database import Base # Import Base from database.py

class CatAttempt(Base):
    __tablename__ = "cat_attempts"
    __table_args__ = {"info": {"skip_autogenerate": True}}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)  
    cat_id = Column(UUID(as_uuid=True), ForeignKey("cats.id"))
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    # Stores answers in JSON like: {"1": "A", "2": "C", "3": "B"}
    answers = Column(JSON)

    # Final score (e.g., 85.0 for 85%)
    score = Column(Float)

    cat = relationship("Cat", back_populates="attempts")
    student = relationship("User", back_populates="cat_attempts")
    answers = relationship("CatAnswer", back_populates="cat_attempt")