
from models import Cat, Question, CatAttempt, User, CatAnswer, CatQuestion
from sqlalchemy.orm import Session
from uuid import uuid4, UUID
from typing import Optional, List
from schemas.cat_schema import CatCreate, QuestionCreate, CatResponse, CatSubmissionSchema
from collections import defaultdict
from fastapi import HTTPException
from datetime import datetime

def create_cat(cat_data: CatCreate, tutor_id: str, db: Session):
    new_cat = Cat(
        id=uuid4(),
        title=cat_data.title,
        course_id=cat_data.course_id,
        tutor_id=UUID(tutor_id)
    )
    db.add(new_cat)
    db.flush()  # Get Cat ID
    
    for q in cat_data.questions:
        question = Question(
            id=uuid4(),
            cat_id=new_cat.id,
            question_text=q.question_text,
            options=q.options,
            correct_answer=q.correct_answer
        )
        db.add(question)
    
    db.commit()
    db.refresh(new_cat)
    return new_cat

def update_cat(cat_id: UUID, questions: List[QuestionCreate], db: Session):
    cat = db.query(Cat).filter_by(id=cat_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Cat not found")

    db.query(Question).filter(Question.cat_id == cat_id).delete()
    db.flush()

    for q in questions:
        question = Question(
            id=uuid4(),
            cat_id=cat_id,
            question_text=q.question_text,
            options=q.options,
            correct_answer=q.correct_answer
        )
        db.add(question)
    
    db.commit()
    return cat

def get_cats_by_tutor(tutor_id: str, db: Session):
    return db.query(Cat).filter_by(tutor_id=tutor_id).all()

def get_cats_for_course(course_id: str, db: Session):
    cats = db.query(Cat).filter(Cat.course_id == course_id).all()
    return cats


def get_cat_by_id(cat_id: UUID, db: Session):
    cat = db.query(Cat).filter_by(id=cat_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Cat not found")
    return cat


def create_cat_attempt(cat_id: UUID, student: User, answers: dict, db: Session):
    cat = db.query(Cat).filter(Cat.id == cat_id).first()
    if not cat:
        raise Exception("Cat not found")

    # MARK the CAT
    total_questions = len(cat.questions)
    correct = 0

    for question in cat.questions:
        q_number = question.question_number
        if q_number in answers:
            if answers[q_number] == question.correct_answer:
                correct += 1

    score = (correct / total_questions) * 100

    attempt = CatAttempt(
        cat_id=cat_id,
        student_id=student.id,
        answers=answers,
        score=score
    )

    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    return attempt

def get_student_attempts(student_id: UUID, db: Session):
    return db.query(CatAttempt).filter(CatAttempt.student_id == student_id).all()

def analyze_student_performance(student_id: UUID, db: Session):
    attempts = db.query(CatAttempt).filter(CatAttempt.student_id == student_id).all()
    topic_mistakes = defaultdict(int)
    topic_total = defaultdict(int)

    for attempt in attempts:
        cat = attempt.cat
        for question in cat.questions:
            q_number = question.question_number
            topic = question.topic

            if q_number in attempt.answers:
                student_answer = attempt.answers[q_number]
                if student_answer != question.correct_answer:
                    topic_mistakes[topic] += 1
            topic_total[topic] += 1

    # Build Analysis
    analysis = []
    for topic in topic_total:
        mistakes = topic_mistakes[topic]
        total = topic_total[topic]
        mistake_rate = (mistakes / total) * 100
        analysis.append({
            "topic": topic,
            "mistake_rate": round(mistake_rate, 2),
            "recommendation": "Focus more on this topic" if mistake_rate > 30 else "Good"
        })

    return analysis

def submit_cat(submission: CatSubmissionSchema, student_id: str, db: Session):
    attempt = CatAttempt(
        id=str(uuid4()),
        student_id=student_id,
        cat_id=submission.cat_id,
        started_at=datetime.utcnow()
    )
    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    total_correct = 0

    for ans in submission.answers:
        question = db.query(CatQuestion).filter_by(id=ans.question_id).first()

        if not question:
            continue  # Skip if question not found

        is_correct = question.correct_answer == ans.selected_answer

        if is_correct:
            total_correct += 1

        cat_answer = CatAnswer(
            id=str(uuid4()),
            cat_attempt_id=attempt.id,
            cat_question_id=question.id,
            selected_answer=ans.selected_answer,
            is_correct=is_correct
        )
        db.add(cat_answer)

    db.commit()

    return {
        "message": "Cat submitted successfully",
        "score": total_correct,
        "total_questions": len(submission.answers),
        "correct_answers": total_correct,
        "wrong_answers": len(submission.answers) - total_correct,
        "attempt_id": attempt.id
    }