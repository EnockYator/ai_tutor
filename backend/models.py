from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from uuid import uuid4
from database import Base  # Assuming you have a database.py setup with SQLAlchemy Base

# =============================
# User & Roles Models
# =============================
class User(Base):
    __tablename__ = 'users'
    id = Column(UUID, primary_key=True, default=uuid4)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum("student", "tutor", "parent", "admin", name="user_roles"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class StudentProfile(Base):
    __tablename__ = 'student_profiles'
    id = Column(UUID, primary_key=True, default=uuid4)
    user_id = Column(UUID, ForeignKey('users.id'), unique=True)
    department = Column(String)
    year_of_study = Column(Integer)
    parent_id = Column(UUID, ForeignKey('users.id'), nullable=True)

# =============================
# Course & Content Models
# =============================
class Course(Base):
    __tablename__ = 'courses'
    id = Column(UUID, primary_key=True, default=uuid4)
    title = Column(String, nullable=False)
    description = Column(Text)
    tutor_id = Column(UUID, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)

class Topic(Base):
    __tablename__ = 'topics'
    id = Column(UUID, primary_key=True, default=uuid4)
    course_id = Column(UUID, ForeignKey('courses.id'))
    title = Column(String, nullable=False)
    description = Column(Text)

class Subtopic(Base):
    __tablename__ = 'subtopics'
    id = Column(UUID, primary_key=True, default=uuid4)
    topic_id = Column(UUID, ForeignKey('topics.id'))
    title = Column(String, nullable=False)
    content = Column(Text)

# =============================
# Assessments & AI Feedback Models
# =============================
class Assessment(Base):
    __tablename__ = 'assessments'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    course_id = Column(UUID, ForeignKey('courses.id'))
    title = Column(String)
    type = Column(Enum("CAT", "QUIZ", name="assessment_types"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Question(Base):
    __tablename__ = 'questions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    assessment_id = Column(UUID, ForeignKey('assessments.id'))
    topic_id = Column(UUID, ForeignKey('topics.id'))
    question_text = Column(Text, nullable=False)
    choices = Column(JSON)
    correct_answer = Column(String, nullable=False)

class StudentAnswer(Base):
    __tablename__ = 'student_answers'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    question_id = Column(UUID, ForeignKey('questions.id'))
    selected_answer = Column(String)
    is_correct = Column(Boolean)
    submitted_at = Column(DateTime, default=datetime.utcnow)

class AIFeedback(Base):
    __tablename__ = 'ai_feedback'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    question_id = Column(UUID, ForeignKey('questions.id'))
    feedback_text = Column(Text, nullable=False)
    recommended_topics = Column(JSON)
    generated_at = Column(DateTime, default=datetime.utcnow)

# =============================
# AI Analysis & Tracking
# =============================
class WeakArea(Base):
    __tablename__ = 'weak_areas'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    topic_id = Column(UUID, ForeignKey('topics.id'))
    subtopic_id = Column(UUID, ForeignKey('subtopics.id'))
    analysis_date = Column(DateTime, default=datetime.utcnow)

class AIPracticeQuiz(Base):
    __tablename__ = 'ai_practice_quizzes'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    topic_id = Column(UUID, ForeignKey('topics.id'))
    generated_questions = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class StudentProgress(Base):
    __tablename__ = 'student_progress'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    completed_quizzes = Column(Integer, default=0)
    weak_areas_improved = Column(Integer, default=0)

class Leaderboard(Base):
    __tablename__ = 'leaderboards'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    points = Column(Integer, default=0)
    badges = Column(JSON)

# =============================
# AI Chat & Speech Features
# =============================
class AIChatInteraction(Base):
    __tablename__ = 'ai_chat_interactions'
    id = Column(UUID, primary_key=True, default=uuid4)
    student_id = Column(UUID, ForeignKey('users.id'))
    query_text = Column(Text, nullable=False)
    response_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
