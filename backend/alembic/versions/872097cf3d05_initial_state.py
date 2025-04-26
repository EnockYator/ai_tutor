"""initial state

Revision ID: 872097cf3d05
Revises: d82f5316a37d
Create Date: 2025-04-26 11:59:48.566907+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '872097cf3d05'
down_revision: Union[str, None] = 'd82f5316a37d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
