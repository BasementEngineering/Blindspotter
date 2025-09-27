# Multi-stage Dockerfile for frontend and backend

# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package.json frontend/pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy frontend source code
COPY frontend/ ./

# Build frontend without type checking
RUN pnpm run build-only

# Stage 2: Backend runtime
FROM oven/bun:1-alpine AS runtime

WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/bun.lock* ./

# Install backend dependencies
RUN bun install --frozen-lockfile

# Copy backend source code
COPY backend/ ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/dist ./public

# Expose port
EXPOSE 3000

# Use existing bun user for security
USER bun

# Start the backend server
CMD ["bun", "run", "main.ts"]