# Import all models here so Alembic can detect them

from .user_model import User
from .course_model import Course
from .assessment_model import Assessment
from .question_model import Question
from .student_answer_model import StudentAnswer
from .ai_feedback_model import AIFeedback
from .ai_practice_quiz_models import AIPracticeQuiz
from .enrollment_models import Enrollments
from .course_notes_models import CourseNotes