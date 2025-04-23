"""add tutor_id to courses manually

Revision ID: edfe7bc1cb69
Revises: 1d653b10f774
Create Date: 2025-04-23 12:06:07.432602+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlalchemy.dialects.postgresql as pg


# revision identifiers, used by Alembic.
revision: str = 'edfe7bc1cb69'
down_revision: Union[str, None] = '1d653b10f774'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('courses',
        sa.Column('tutor_id', pg.UUID(), nullable=True)
    )
    op.create_foreign_key(
        'fk_courses_tutor_id',
        'courses',
        'users',
        ['tutor_id'],
        ['id'],
        ondelete='SET NULL'        
    )
    

def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('fk_courses_tutor_id', type_='foreignkey')
    op.drop_column('courses', 'tutor_id')
