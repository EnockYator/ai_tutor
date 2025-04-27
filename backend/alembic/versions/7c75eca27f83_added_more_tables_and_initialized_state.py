"""Added more tables and initialized state

Revision ID: 7c75eca27f83
Revises: 12f7a3ede057
Create Date: 2025-04-27 09:48:11.267575+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7c75eca27f83'
down_revision: Union[str, None] = '12f7a3ede057'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
