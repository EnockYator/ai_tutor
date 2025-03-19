from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
import os
import sys
from alembic import context
from urllib.parse import quote_plus  # Import quote_plus to encode special characters
from dotenv import load_dotenv  # Import dotenv to load environment variables

# Load .env file
load_dotenv()


# Add the backend directory to sys.path so Alembic can find models
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import your models
from database import Base

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config
# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# Set the target metadata for Alembic
target_metadata = Base.metadata


# Get DATABASE_URL from .env
raw_db_url = os.getenv("DATABASE_URL")
if not raw_db_url:
    raise ValueError("DATABASE_URL environment variable is not set")

# Encode special characters in the password
from sqlalchemy.engine.url import make_url
parsed_url = make_url(raw_db_url)
encoded_password = quote_plus(parsed_url.password)  # Encode special characters in the password
db_url = raw_db_url.replace(parsed_url.password, encoded_password)


# Get the DATABASE_URL from .env
db_url = os.getenv("DATABASE_URL")
# Ensure db_url is not None
if not db_url:
    raise ValueError("DATABASE_URL environment variable is not set.")

# Prevent Alembic from treating '%' as an interpolation character
config.set_main_option("sqlalchemy.url", db_url.replace("%", "%%"))  # Escape %



#config.set_main_option("sqlalchemy.url", db_url)
# engine = create_engine(db_url)


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
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


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
