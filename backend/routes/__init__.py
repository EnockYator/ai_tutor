from fastapi import APIRouter
from .user_routes import router as user_router
#from .assessment_routes import router as assessment_router

router = APIRouter()
router.include_router(user_router)
