from fastapi import APIRouter

from .cart import router as cart_router
from .product import router as product_router

main_router = APIRouter()

main_router.include_router(cart_router, prefix="/cart", tags=["cart"])
main_router.include_router(product_router, prefix="/product", tags=["product"])


@main_router.get("/")
async def index():
    return {"message": "Hello World!"}