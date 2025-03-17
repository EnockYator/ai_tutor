from fastapi import APIRouter
from .user_routes import router as user_router
from .auth_routes import router as auth_router
from .course_routes import router as course_router

router = APIRouter()
router.include_router(user_router)
router.include_router(auth_router)
router.include_router(course_router)

