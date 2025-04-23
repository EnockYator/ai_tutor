from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from uuid import uuid4
from database import Base # Import Base from database.py

class Course(Base):
    __tablename__ = "courses"
    __table_args__ = {"info": {"skip_autogenerate": True}}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    course_title = Column(String, nullable=False)
    course_code = Column(String, nullable=False)
    course_tutor = Column(String, nullable=False)
    # course_notes = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    tutor_id = Column(UUID, ForeignKey('users.id'), nullable=False)
    
    course_notes = relationship("CourseNotes", back_populates="course")
    students = relationship("User", back_populates="courses")
    
    # notes = relationship("CourseNotes", back_populates="courses")
    # tutors = relationship("User", back_populates="courses")
    # students = relationship("Enrollments", back_populates="courses")
    # enrollments = relationship("Enrollments", back_populates="course")
    # assessments = relationship("Assessment", back_populates="course")
    # ai_practice_quizzes = relationship("AiPracticeQuiz", back_populates="course")
