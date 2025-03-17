from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from uuid import UUID

class CourseCreate(BaseModel):
    course_title: str
    course_code: str
    course_tutor: str
    course_notes: List[str]

class CourseResponse(BaseModel):
    id: UUID
    course_title: str
    course_code: str
    course_tutor: str
    created_at: datetime
    
    @classmethod
    def from_orm(cls, course):
        return cls(
            id=UUID(course.id),
            course_title=course.course_title,
            course_code=course.course_code,
            course_tutor=course.course_tutor,
            course_notes=course.course_notes,
            created_at=course.created_at.isoformat()  # Convert datetime to string
        )
    