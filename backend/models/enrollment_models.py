from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from uuid import uuid4
from database import Base # Import Base from database.py

class Enrollments(Base):
    __tablename__ = "enrollments"
    __table_args__ = {"info": {"skip_autogenerate": True}}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    course_id = Column(UUID, ForeignKey('courses.id'))
    student_id = Column(UUID, ForeignKey('users.id'))
    
    students = relationship("User", back_populates="enrollments")
    
    # courses = relationship("Course", back_populates="students")
    # course = relationship("Course", back_populates="enrollments")
    # student = relationship("User", back_populates="enrollments")
    # course_notes = relationship("CourseNotes", back_populates="enrollments")
    # courses = relationship("Course", back_populates="enrollments")
    # assessments = relationship("Assessment", back_populates="enrollments")
    # ai_practice_quizzes = relationship("AiPracticeQuiz", back_populates="enrollments")
    # student_answers = relationship("StudentAnswers", back_populates="enrollments")
    # ai_feedback = relationship("AiFeedback", back_populates="enrollments")