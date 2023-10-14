from backend.domain.dto.base import DTO


class ProductDTO(DTO):
    id: int
    name: str
    price: int
    image: str
    old_price: int
    review: float
    review_count: int
