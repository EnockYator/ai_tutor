from logging.config import fileConfig
import sys
import os

from sqlalchemy import engine_from_config, pool
from alembic import context

# Ensure the 'backend' directory is in the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import your Base metadata from your models
from models import Base  # Adjusted import to match the correct path

# Alembic Config object, which provides access to values within .ini file
config = context.config

# Setup logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set target_metadata for autogeneration support
target_metadata = Base.metadata  # This was previously `None`, now it's correctly set.

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine. Calls to context.execute() 
    here emit the given string to the script output.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    This scenario creates an Engine and associates
    a connection with the context.
    """

    from sqlalchemy import create_engine

    # Ensure DATABASE_URL is set in environment variables
    database_url = os.getenv("DATABASE_URL")
    
    if not database_url:
        raise ValueError("DATABASE_URL environment variable is not set")

    connectable = create_engine(database_url, poolclass=pool.NullPool)  # Ensure pooling is disabled for Alembic

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True  # Ensure column type changes are detected
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
