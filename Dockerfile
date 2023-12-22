FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY . /app
COPY requirements.txt .
COPY configreader.py .
COPY .env .
RUN apt-get update \
 && apt-get install -y gcc \
 && pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir setuptools wheel \
 && pip install --no-cache-dir -r requirements.txt \
 && rm -rf /var/lib/apt/lists/*

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
