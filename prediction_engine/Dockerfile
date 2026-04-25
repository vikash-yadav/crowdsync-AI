# Build stage
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Final stage
FROM python:3.11-slim
WORKDIR /app
RUN groupadd -r pythonuser && useradd -r -g pythonuser pythonuser
COPY --from=builder /root/.local /home/pythonuser/.local
COPY . .
ENV PATH=/home/pythonuser/.local/bin:$PATH
RUN chown -R pythonuser:pythonuser /app
USER pythonuser
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
