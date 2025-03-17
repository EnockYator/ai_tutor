from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from services.course_service import add_course, get_course_by_code, get_course_by_title, get_course_by_id
from schemas.course_schema import CourseCreate, CourseResponse
from models import Course
from database import get_db, SessionLocal

# Dependency to get a database session
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix="/courses", tags=["Courses"])

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
