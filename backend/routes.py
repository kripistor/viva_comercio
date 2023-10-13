from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database.models import Product, Cart
from backend.database.models.database import get_session

router = APIRouter()


@router.get("/")
async def root():
    return {"message": "Hello World"}


@router.get("/cart", tags=["cart"])
async def get_cart_items(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Product).where(Product.id == Cart.product_id))
    products = result.scalars().all()
    return JSONResponse(
        content={"products": [{"id": p.id, "name": p.name, "image": p.image, "price": p.price} for p in products]})


@router.post("/cart", tags=["cart"])
async def add_to_cart(product_id: str, session: AsyncSession = Depends(get_session)):
    product_id = int(product_id)
    await session.execute(insert(Cart).values(product_id=product_id))
    await session.commit()
