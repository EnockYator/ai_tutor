"""initial state

Revision ID: 45bf39c40061
Revises: d7fbfed573dd
Create Date: 2025-04-26 11:54:08.968286+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '45bf39c40061'
down_revision: Union[str, None] = 'd7fbfed573dd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
