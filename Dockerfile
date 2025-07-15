# Stage 1: Base image with necessary build tools
FROM node:22 AS base
WORKDIR /app
# Install essential build tools for native modules
RUN apt-get update && apt-get install -y build-essential python

# Stage 2: Install dependencies in a clean environment
FROM base AS deps
# Copy only the package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Clean the npm cache and install dependencies
RUN npm cache clean --force && \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Build the application
FROM base AS builder
# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .

# Ensure the correct native modules are built
RUN npm rebuild

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Run the build
RUN npm run build

# Stage 4: Create the final production image
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder from the builder stage
COPY --from=builder /app/public ./public

# Set correct permissions for the .next folder
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the standalone Next.js server output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

EXPOSE 3000
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]