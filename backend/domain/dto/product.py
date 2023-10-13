from backend.domain.dto.base import DTO


class ProductDTO(DTO):
    id: int
    name: str
    price: int
    image: str
