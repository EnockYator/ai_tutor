from sqlalchemy import Column, String, DateTime, Enum, Boolean
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from sqlalchemy.orm import relationship
from database import Base # Import Base from database.py

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"info": {"skip_autogenerate": True}}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum("student", "tutor", name="user_roles"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    courses = relationship("Course", back_populates="students")
    enrollments = relationship("Enrollments", back_populates="students")
    cat_attempts = relationship("CatAttempt", back_populates="student")

    # courses = relationship("Course", back_populates="tutors")
    # enrollments = relationship("Enrollments", back_populates="students")
    # assessments = relationship("Assessment", back_populates="tutors")
    # ai_practice_quizzes = relationship("AiPracticeQuiz", back_populates="tutors")
    # student_answers = relationship("StudentAnswers", back_populates="students")
    # ai_feedback = relationship("AiFeedback", back_populates="students")
    # course_notes = relationship("CourseNotes", back_populates="students")