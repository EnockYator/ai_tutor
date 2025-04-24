from sqlalchemy.orm import Session
from models import Course, Enrollments, CourseNotes
from schemas.course_schema import CourseCreate, CourseResponse, NotesData
import uuid
import os
from typing import List
from uuid import uuid4
from fastapi import HTTPException, UploadFile, File
from datetime import datetime

import shutil
from .auth_service import get_current_user



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


def save_uploaded_files(course_notes: List[UploadFile]) -> List[NotesData]:
    """
    Save list of UploadFile objects to disk and return metadata list.
    """
        
    UPLOAD_DIR = "uploads/notes"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    saved = []
    for note in course_notes:
        # Generate a unique filename
        filename = f"{uuid.uuid4()}_{note.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        content_type = ''
        
        #Save the file
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(note.file, buffer)
        
        # Get content type
        content_type = note.content_type or 'application/octet-stream'
        saved.append(
            NotesData(
                file_name=filename,
                file_path=filepath,
                content_type=content_type
            ))
    return saved

def create_course_with_notes(course_data: CourseCreate, tutor_id: str, db: Session):
    """Creates a new course with notes"""
    try:
        # Convert string to UUID if needed
        tutor_uuid = uuid.UUID(tutor_id) if isinstance(tutor_id, str) else tutor_id
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid tutor ID format")
    
    # Create the course
    new_course = Course(
        id=uuid4(),
        course_title = course_data.course_title,
        course_code = course_data.course_code,
        course_tutor=tutor_uuid,
        created_at=datetime.utcnow(),
        tutor_id = tutor_uuid,
    )
    db.add(new_course)
    db.flush()  # Assigns ID to new_course before using it in CourseNote
    
    # Add notes using the actual file data from NotesData
    for note in course_data.course_notes:
        course_note = CourseNotes(
            id=uuid4(),
            course_id=new_course.id,
            file_name=note.file_name,
            file_path=note.file_path,
            content_type=note.content_type
        )
        db.add(course_note)
    
    db.commit()
    db.refresh(new_course)
    return new_course


def enroll_student(course_id: str, student_id: str, db: Session):
    """Enroll a student in a course."""
    existing = db.query(Enrollments).filter_by(course_id=course_id, student_id=student_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    enrollment = Enrollments(id=uuid4(), course_id=course_id, student_id=student_id)
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment


def get_created_courses_by_tutor(tutor_id: str, db: Session):
    return db.query(Course).filter(Course.tutor_id == tutor_id).all()

def get_all_courses_by_users(db: Session):
    return db.query(Course).filter(Course.course_id == id).all()

def get_enrolled_courses(student_id: str, db: Session):
    return db.query(Course).join(Enrollments).filter(Enrollments.student_id == student_id).all()

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


