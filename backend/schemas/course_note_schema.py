from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from uuid import UUID

class NoteResponse(BaseModel):
    file_name: str
    file_path: str
    content_type: str

    class Config:
        from_attributes = True


