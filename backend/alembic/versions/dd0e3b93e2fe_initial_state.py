"""initial state

Revision ID: dd0e3b93e2fe
Revises: 45bf39c40061
Create Date: 2025-04-26 11:54:39.550001+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dd0e3b93e2fe'
down_revision: Union[str, None] = '45bf39c40061'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
