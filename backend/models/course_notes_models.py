from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from database import Base # Import Base from database.py

class CourseNotes(Base):
    __tablename__ = "course_notes"
    __table_args__ = {"info": {"skip_autogenerate": True}}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    file_name = Column(String)
    file_path = Column(String)
    content_type = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    course_id = Column(UUID, ForeignKey('courses.id'))

    course = relationship("Course", back_populates="course_notes")
    # enrollments = relationship("Enrollments", back_populates="course_notes")
    # assessments = relationship("Assessment", back_populates="course_notes")
    # ai_practice_quizzes = relationship("AiPracticeQuiz", back_populates="course_notes")
    # student_answers = relationship("StudentAnswers", back_populates="course_notes")
    # ai_feedback = relationship("AiFeedback", back_populates="course_notes")