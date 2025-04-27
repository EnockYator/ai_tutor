from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List
from schemas.cat_schema import CatCreate, CatResponse, QuestionCreate, AttemptCreate, AttemptResponse, CatSubmissionSchema
from models import Cat, CatQuestion, CatAttempt
from services.auth_service import get_current_user
from services.cat_service import (
    create_cat, update_cat, get_cats_by_tutor, get_cats_for_course, get_cat_by_id,
    create_cat_attempt, get_student_attempts, analyze_student_performance)
from database import get_db
from services.auth_service import get_current_user
# from services.cat_attempt_service import analyze_student_performance
from models import User, CatAttempt, CatAnswer

router = APIRouter(prefix="/cats", tags=["Cats"])

@router.post("/", response_model=CatResponse)
def create_new_cat(
    cat_data: CatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "tutor":
        raise HTTPException(status_code=403, detail="Only tutors can create Cats")
    return create_cat(cat_data, str(current_user.id), db)

@router.put("/{cat_id}", response_model=CatResponse)
def update_existing_cat(
    cat_id: UUID,
    questions: List[QuestionCreate],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "tutor":
        raise HTTPException(status_code=403, detail="Only tutors can update Cats")
    return update_cat(cat_id, questions, db)

@router.get("/tutor", response_model=List[CatResponse])
def get_my_cats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "tutor":
        raise HTTPException(status_code=403, detail="Only tutors can view their Cats")
    return get_cats_by_tutor(str(current_user.id), db)

@router.get("/course/{course_id}", response_model=List[CatResponse])
def get_cats_for_course_service(
    course_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cats = get_cats_for_course(course_id, db)
    if not cats:
        raise HTTPException(status_code=404, detail="No cats found for this course")
    # if student, hide correct answers
    if current_user.role == "student":
        for cat in cats:
            for question in cat.questions:
                question.correct_answer = ""
                
    return cats


@router.get("/{cat_id}", response_model=CatResponse)
def get_single_cat(
    cat_id: UUID,
    db: Session = Depends(get_db)
):
    return get_cat_by_id(cat_id, db)


@router.get("/analysis/me")
def ai_analysis(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "student":
        raise Exception("Only students can view analysis")

    analysis = analyze_student_performance(current_user.id, db)
    return {
        "student_id": current_user.id,
        "analysis": analysis
    }


@router.post("/attempt/{cat_id}", response_model=AttemptResponse)
def attempt_cat(
    cat_id: UUID,
    attempt_data: AttemptCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "student":
        raise Exception("Only students can attempt Cats")

    attempt = create_cat_attempt(cat_id, current_user, attempt_data.answers, db)
    return attempt

@router.get("/attempts/me", response_model=List[AttemptResponse])
def get_my_attempts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "student":
        raise Exception("Only students can view attempts")

    attempts = get_student_attempts(current_user.id, db)
    return attempts

@router.post("/submit")
async def submit_cat(submission: CatSubmissionSchema, db: Session = Depends(get_db), current_student_id: str = Depends(get_current_user)):
    attempt = CatAttempt(student_id=current_student_id, cat_id=submission.cat_id)
    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    total_correct = 0

    for ans in submission.answers:
        question = db.query(CatQuestion).filter_by(id=ans.question_id).first()
        is_correct = question.correct_answer == ans.selected_answer

        if is_correct:
            total_correct += 1

        cat_answer = CatAnswer(
            cat_attempt_id=attempt.id,
            cat_question_id=question.id,
            selected_answer=ans.selected_answer,
            is_correct=is_correct
        )
        db.add(cat_answer)

    db.commit()

    return {"message": "Cat submitted successfully", "score": total_correct}