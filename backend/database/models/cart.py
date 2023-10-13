from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column

from backend.database.models.database import Base


class Cart(Base):
    __tablename__ = "cart"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(Integer, nullable=False)
