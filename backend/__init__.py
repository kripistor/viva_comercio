from fastapi import APIRouter

from routes.cart import router as cart_router

main_router = APIRouter()

main_router.include_router(cart_router, prefix="/cart", tags=["cart"])


@main_router.get("/")
async def index():
    return {"message": "Hello World!"}
