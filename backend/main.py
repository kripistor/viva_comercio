import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend import routes
app = FastAPI()
origins = ["http://localhost:3000", "localhost:3000"]
app.include_router(routes.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
