from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from uuid import UUID


class NotesData(BaseModel):
    id: UUID
    filename: str
    saved_path: str
    content_type: str
    
class CourseCreate(BaseModel):
    course_title: str
    course_code: str
    course_notes: List[NotesData] = []
    # course_tutor: str
    # course_notes: Optional[str]  # Path or URL to uploaded file
    
    class Config:
        from_attributes = True

class CourseResponse(BaseModel):
    id: UUID
    course_title: str
    course_code: str
    course_notes: List[str]  # Path or URL to uploaded file
    course_tutor: str
    created_at: datetime
    
    class Config:
        from_attributes = True
    
    # @classmethod
    # def from_orm(cls, course):
    #     return cls(
    #         id=UUID(course.id),
    #         course_title=course.course_title,
    #         course_code=course.course_code,
    #         course_tutor=course.course_tutor,
    #         course_notes=course.course_notes,
    #         created_at=course.created_at.isoformat()  # Convert datetime to string
    #     )
    # @classmethod
    # def from_orm(cls, user):
    #     return cls(
    #         id=UUID(user.id),
    #         full_name=user.full_name
    #     )

class EnrollmentSchema(BaseModel):
    id: UUID
    enrolled_at: datetime
    course_id: UUID
    student_id: UUID

    class Config:
        from_attributes = True
        
class EnrollmentResponse(BaseModel):
    enrolled_at: datetime
    course_id: UUID
    student_id: UUID

    class Config:
        from_attributes = True
        
    @classmethod
    def from_orm(cls, enrollment):
        return cls(
            id=UUID(enrollment.id),
            enrolled_at=enrollment.enrolled_at.isoformat(),  # Convert datetime to string
            course_id=UUID(enrollment.course_id),
            student_id=UUID(enrollment.student_id)
        )