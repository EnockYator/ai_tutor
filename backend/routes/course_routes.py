from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status, Form
from sqlalchemy.orm import Session
import shutil, os
from uuid import uuid4
from uuid import UUID
from typing import List
from services.auth_service import get_current_user
from models import User, Course
from services.course_service import (
    get_created_courses_by_tutor, get_all_available_courses, enroll_student, get_enrolled_courses,
    add_course, get_course_by_code, get_course_by_title, get_course_by_id, create_course_with_notes,
    save_uploaded_files
)
from services.auth_service import get_current_user
from schemas.course_schema import CourseCreate, CourseResponse, EnrollmentResponse, EnrollmentSchema,TutorCoursesList, StudentCoursesList, StudentCourseResponse, CourseResponseList
from models import Course, User
from database import get_db, SessionLocal

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.post("/create", response_model=CourseCreate)
def create_new_course(
    course_title: str = Form(...),
    course_code: str = Form(...),
    course_notes: List[UploadFile] = File(...),
    current_user: dict = Depends(get_current_user), # Get the current logged-in user (tutor)
    # course_tutor: str = Form(...),
    # course_notes: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    # user: User = Depends(get_current_user)
):
    
    # Role guard
    if current_user.role != "tutor":
        raise HTTPException(status_code=403, detail="Only tutors can create courses")

    # Duplicate check
    if db.query(Course).filter(Course.course_code == course_code).first():
        raise HTTPException(status_code=400, detail="Course already exists")

    # Save files and get metadata
    notes_meta = save_uploaded_files(course_notes)

    # Build payload and delegate to service
    course_data = CourseCreate(
        course_title=course_title,
        course_code=course_code,
        course_notes=notes_meta,
        course_tutor=str(current_user.id)

    )
    # Create the course and assign the tutor's ID automatically
    return create_course_with_notes(course_data, str(current_user.id), db)


@router.post("/enroll", response_model=EnrollmentResponse)
def enroll_in_course(
    enroll_data: EnrollmentSchema,
    db: Session = Depends(get_db)
):
    return enroll_student(enroll_data, db)


@router.get("/tutor/{tutor_id}", response_model=TutorCoursesList)
def get_tutor_courses(
    tutor_id: UUID,  # or str if you want to handle string conversion
    db: Session = Depends(get_db)
):
    """
    Get all courses created by a specific tutor.
    
    Parameters:
    - tutor_id: UUID of the tutor
    
    Returns:
    - List of courses created by the tutor
    """
    return get_created_courses_by_tutor(tutor_id, db)

@router.get("/all", response_model=CourseResponseList)
def get_all_courses(
    student_id: UUID = None,  # Optional: to check enrollment status
    db: Session = Depends(get_db)
):
    """
    Get all available courses in the system.
    Optionally takes student_id to check enrollment status.
    """
    return get_all_available_courses(db, student_id)

@router.get("/student", response_model=List[StudentCourseResponse])
def get_student_courses(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    if user.role != "student":
        raise HTTPException(status_code=403, detail="Not a student")
    return get_enrolled_courses(str(user.id), db)

@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)

def create_course(course_data: CourseCreate, db: Session = Depends(get_db)):
    """Add a new course."""
    existing_course = db.query(Course).filter(Course.course_title == course_data.course_title).first()
    if existing_course:
        raise HTTPException(status_code=400, detail="course already registered")
    # Call the actual service function
    return add_course(course_data, db)


@router.get("/{course_id}", response_model=CourseResponse)
def fetch_course_by_id(course_id: str, db: Session = Depends(get_db)):
    """Get course details by ID."""
    user = get_course_by_id(db, course_id)
    if not user:
        raise HTTPException(status_code=404, detail="Course not found")
    return user


@router.get("/by-title/", response_model=CourseResponse)
def fetch_course_by_title(course_title: str, db: Session = Depends(get_db)):
    """Get course by title."""
    course = get_course_by_title(db, course_title)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.get("/by-code/", response_model=CourseResponse)
def fetch_course_by_code(course_code: str, db: Session = Depends(get_db)):
    """Get course by code."""
    course = get_course_by_code(db, course_code)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
