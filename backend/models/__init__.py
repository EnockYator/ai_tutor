# from sqlalchemy.orm import declarative_base
# from sqlalchemy.ext.declarative import declarative_base


# Base = declarative_base()

from .user_model import User
from .course_model import Course
from .assessment_model import Assessment
from .question_model import Question
from .student_answer_model import StudentAnswer