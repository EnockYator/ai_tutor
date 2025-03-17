from sqlalchemy.orm import Session
from models.course_model import Course
from schemas.course_schema import CourseCreate, CourseResponse
import uuid
from uuid import uuid4
from fastapi import HTTPException

def add_course(course_data: CourseCreate, db: Session):
    """Creates a new course"""
    new_course = Course(
        id=uuid4(),
        course_title = course_data.course_title,
        course_code = course_data.course_code,
        course_tutor = course_data.course_tutor,
        course_notes = course_data.course_notes
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course) 
    return new_course

def get_course_by_title(db: Session, course_title: str):
    """Fetch course by title."""
    course = db.query(Course).filter(Course.course_title == course_title).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course



def get_course_by_code(db: Session, course_code: str):
    """Fetch course by code."""
    course = db.query(Course).filter(Course.course_code == course_code).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course



def get_course_by_id(db, course_id: str):
    """Fetch a course by id."""
    try:
        course_uuid = uuid.UUID(course_id) # Convert string to UUID
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid course ID format")
    course = db.query(Course).filter(Course.id == course_uuid).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
