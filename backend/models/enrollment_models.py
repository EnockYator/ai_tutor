from sqlalchemy import Column, DateTime, ForeignKey, Boolean
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
    enrolled = Column(Boolean, default=True)
    
    students = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")