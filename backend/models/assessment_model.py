from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from database import Base # Import Base from database.py

class Assessment(Base):
    __tablename__ = 'assessments'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    course_id = Column(UUID, ForeignKey('courses.id'))
    title = Column(String)
    type = Column(Enum("CAT", "QUIZ", name="assessment_types"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)