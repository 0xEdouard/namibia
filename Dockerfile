# Stage 1: Generate interactive map with Folium
FROM python:3.11-slim AS map-builder
WORKDIR /src
RUN pip install --no-cache-dir folium
COPY generate_maps.py .
COPY images ./images
RUN python3 generate_maps.py

# Stage 2: Build Next.js app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY web/package*.json ./
RUN npm ci

# Copy source code
COPY web/ .

# Copy generated map to public folder
COPY --from=map-builder /src/images/route_map.html ./public/route_map.html

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
