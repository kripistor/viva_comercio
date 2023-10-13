from pydantic import PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    postgres_dsn: PostgresDsn
    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")


config = Config()
