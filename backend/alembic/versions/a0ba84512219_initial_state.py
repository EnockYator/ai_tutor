"""initial state

Revision ID: a0ba84512219
Revises: dd0e3b93e2fe
Create Date: 2025-04-26 11:55:08.541966+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a0ba84512219'
down_revision: Union[str, None] = 'dd0e3b93e2fe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
