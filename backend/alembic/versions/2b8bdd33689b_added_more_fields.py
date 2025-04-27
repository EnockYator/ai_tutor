"""Added more fields

Revision ID: 2b8bdd33689b
Revises: 7c75eca27f83
Create Date: 2025-04-27 10:31:13.767719+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2b8bdd33689b'
down_revision: Union[str, None] = '7c75eca27f83'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
