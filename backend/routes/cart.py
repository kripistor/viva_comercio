from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import select, insert, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database.models import Product, Cart
from backend.database.models.database import get_session

router = APIRouter()


@router.get("/")
async def get_cart_items(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Product).where(Product.id == Cart.product_id))
    products = result.scalars().all()
    cart_items = []
    for p in products:
        cart_item = {"id": p.id, "name": p.name, "image": p.image, "price": p.price}
        cart_entry = await session.execute(select(Cart).where(Cart.product_id == p.id))
        cart_product = cart_entry.scalar_one_or_none()
        if cart_product:
            cart_item["count"] = cart_product.count
        else:
            cart_item["count"] = 0
        cart_items.append(cart_item)
    return JSONResponse(content={"products": cart_items})


@router.delete("/")
async def delete_cart_item(product_id: str, session: AsyncSession = Depends(get_session)):
    await session.execute(delete(Cart).where(Cart.product_id == int(product_id)))
    await session.commit()


@router.post("/")
async def add_to_cart(product_id: int, session: AsyncSession = Depends(get_session)):
    existing_item = await session.execute(select(Cart).where(Cart.product_id == product_id))
    cart_item = existing_item.scalar_one_or_none()

    if cart_item:
        await session.execute(
            update(Cart)
            .where(Cart.product_id == product_id)
            .values(count=Cart.count + 1)
        )
    else:
        await session.execute(
            insert(Cart).values(product_id=product_id, count=1)
        )

    await session.commit()


@router.put("/increase")
async def increase_cart_item(product_id: str, session: AsyncSession = Depends(get_session)):
    product_id = int(product_id)

    existing_item = await session.execute(select(Cart).where(Cart.product_id == product_id))
    cart_item = existing_item.scalar_one_or_none()

    if cart_item:
        await session.execute(
            update(Cart)
            .where(Cart.product_id == product_id)
            .values(count=Cart.count + 1)
        )
    else:
        await session.execute(
            insert(Cart).values(product_id=product_id, count=1)
        )

    await session.commit()


@router.put("/decrease")
async def decrease_cart_item(product_id: str, session: AsyncSession = Depends(get_session)):
    product_id = int(product_id)

    existing_item = await session.execute(select(Cart).where(Cart.product_id == product_id))
    cart_item = existing_item.scalar_one_or_none()

    if cart_item:
        if cart_item.count > 1:
            await session.execute(
                update(Cart)
                .where(Cart.product_id == product_id)
                .values(count=Cart.count - 1)
            )
        else:
            await session.execute(delete(Cart).where(Cart.product_id == product_id))

        await session.commit()
