"""initial state

Revision ID: d82f5316a37d
Revises: b16f16dac1ff
Create Date: 2025-04-26 11:56:33.713913+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd82f5316a37d'
down_revision: Union[str, None] = 'b16f16dac1ff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_table('ai_feedback')
    op.drop_table('student_answers')
    op.drop_table('questions')
    op.drop_table('ai_practice_quizzes')
    op.drop_table('assessments')
    op.drop_table('course_notes')
    op.drop_table('enrollments')
    op.drop_table('courses')
    op.drop_table('users')


def downgrade() -> None:
    """Downgrade schema."""
    pass
