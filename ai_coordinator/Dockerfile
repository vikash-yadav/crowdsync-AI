# Build stage
FROM python:3.11-slim as builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Final stage
FROM python:3.11-slim

WORKDIR /app

# Create a non-root user
RUN groupadd -r pythonuser && useradd -r -g pythonuser pythonuser

# Copy installed packages from builder
COPY --from=builder /root/.local /home/pythonuser/.local
COPY . .

# Set environment and permissions
ENV PATH=/home/pythonuser/.local/bin:$PATH
RUN chown -R pythonuser:pythonuser /app
USER pythonuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
