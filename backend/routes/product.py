from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database.models import Product
from backend.database.models.database import get_session

router = APIRouter()


@router.get("/")
async def get_all_items(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Product))
    products = result.scalars().all()
    product_data = [{
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "image": p.image,
        "old_price": p.old_price,
        "review": p.review,
        "review_count": p.review_count
    } for p in products]
    return JSONResponse(content={"products": product_data})
