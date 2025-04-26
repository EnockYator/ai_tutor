from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from uuid import UUID


class NotesData(BaseModel):
    # id: UUID
    file_name: str
    file_path: str
    content_type: str
    
    class Config:
        from_attributes = True
        orm_mode = True  # This allows Pydantic to work with ORM objects

    
class CourseCreate(BaseModel):
    course_title: str
    course_code: str
    course_notes: List[NotesData] = []
    course_tutor: str
    # course_notes: Optional[str]  # Path or URL to uploaded file
    
    class Config:
        from_attributes = True
        
class CourseNoteResponse(BaseModel):
    id: UUID
    file_name: str
    file_path: str
    content_type: str
    uploaded_at: datetime
    course_id: UUID   
    
    class Config:
        from_attributes = True

class CourseResponse(BaseModel):
    id: UUID
    course_title: str
    course_code: str
    course_notes: List[CourseNoteResponse]  
    course_tutor: str
    created_at: datetime
    enrolled: bool = False  # Default to False, indicating the student is not enrolled
    
    class Config:
        from_attributes = True
        

class CourseResponseList(BaseModel):
    courses: List[CourseResponse]
    
    class Config:
        from_attributes = True

# class StudentCoursesResponse(BaseModel):
#     tutor_name: str  # If you want to include tutor info
#     enrollment_status: bool = False  # Whether student is enrolled    
    
class TutorCoursesList(BaseModel):
    courses: List[CourseResponse]
    
    class Config:
        from_attributes = True

class StudentCourseResponse(BaseModel):
    id: UUID
    course_title: str
    course_code: str
    course_notes: List[CourseNoteResponse]  
    course_tutor: str
    created_at: datetime
    enrolled: bool = True  # Default to False, indicating the student is not enrolled
    # # tutor_name: str  # If you want to include tutor info
    # enrollment_status: bool = False  # Whether student is enrolled
    
    class Config:
        from_attributes = True

    
class StudentCoursesList(BaseModel):
    courses: List[StudentCourseResponse]
    
    class Config:
        from_attributes = True
    
    
class EnrollmentSchema(BaseModel):
    # id: UUID
    # enrolled_at: datetime
    course_id: UUID
    student_id: UUID
    enrolled: bool = True  # Default to True, indicating the student is enrolled

    class Config:
        from_attributes = True
        
class EnrollmentResponse(BaseModel):
    id: UUID
    enrolled_at: datetime
    course_id: UUID
    student_id: UUID
    enrolled: bool = True  # Default to True, indicating the student is enrolled

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