# Build stage
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# Final stage
FROM node:20-slim

WORKDIR /app

# Create non-root user
RUN groupadd -r nodeuser && useradd -r -g nodeuser nodeuser

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Set permissions
RUN chown -R nodeuser:nodeuser /app
USER nodeuser

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:8080/health', (res) => res.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["npm", "start"]