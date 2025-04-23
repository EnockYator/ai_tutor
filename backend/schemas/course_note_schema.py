from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from uuid import UUID

class NoteResponse(BaseModel):
    filename: str
    saved_path: str
    content_type: str

    class Config:
        from_attributes = True


