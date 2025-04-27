from fastapi import APIRouter
from .user_routes import router as userRouter
from .auth_routes import router as authRouter
from .cat_routes import router as catRouter
from .course_routes import router as courseRouter
from .protected_routes import router as protectedRouter

router = APIRouter()
router.include_router(userRouter)
router.include_router(authRouter)
router.include_router(courseRouter)
router.include_router(protectedRouter)
router.include_router(catRouter)

