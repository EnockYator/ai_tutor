from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from uuid import uuid4
from database import Base # Import Base from database.py

class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    course_title = Column(String, nullable=False)
    course_code = Column(String, nullable=False)
    course_tutor = Column(String, nullable=False)
    course_notes = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
