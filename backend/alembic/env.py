import os
from logging.config import fileConfig
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy import pool
from alembic import context

# Load environment variables from .env file
load_dotenv()

# Import your SQLAlchemy Base and models here
# This is necessary for Alembic to detect your models and generate migrations
from database import Base, SQLALCHEMY_DATABASE_URL

# Alembic Config object, which provides access to the values within the .ini file
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Get the database URL from an environment variable
# DATABASE_URL = os.getenv("DATABASE_URL")
# print(f"Database URL: {DATABASE_URL}")  # Debugging: Print the URL to verify

# if not DATABASE_URL:
    # raise ValueError("DATABASE_URL environment variable is not set")


# Set the SQLAlchemy URL in the Alembic config
config.set_main_option("sqlalchemy.url", SQLALCHEMY_DATABASE_URL)

# Add your model's MetaData object here
# This is used by Alembic to detect changes in your models
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """
    Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well. By skipping the Engine creation,
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.
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


def include_object(object, name, type_, reflected, compare_to):
    # Prevent Alembic from dropping specific tables
    if type_ == "table" and name in ["ai_feedback", "ai_practice_quizzes", "assessments", "courses", 
        "questions", "student_answers", "users"]:
        return False
    return True


def run_migrations_online() -> None:
    """
    Run migrations in 'online' mode.

    In this scenario, we need to create an Engine
    and associate a connection with the context.
    """
    connectable = create_engine(
        database_url,
        poolclass=pool.NullPool,  # Disable connection pooling for migrations
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # Enable type comparison for autogenerate
            compare_server_default=True,  # Enable server default comparison for autogenerate
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()