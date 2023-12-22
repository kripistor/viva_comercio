from pydantic_settings import BaseSettings


class Config(BaseSettings):
    postgres_dsn: str

    class Config:
        env_file = "./.env"
        extra = "ignore"


config = Config()
