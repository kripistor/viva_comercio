from pydantic import BaseModel, Extra


class DTO(BaseModel):
    class Config:
        use_enum_values = False
        extra = Extra.forbid
        frozen = True
        from_attributes = True
