from fastapi import APIRouter
from .user_routes import router as userRouter
from .auth_routes import router as authRouter
from .course_routes import router as courseRouter

router = APIRouter()
router.include_router(userRouter)
router.include_router(authRouter)
router.include_router(courseRouter)

