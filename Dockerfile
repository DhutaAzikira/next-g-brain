# 1. Base stage for a clean build environment
FROM node:18 AS base
WORKDIR /app

# 2. Install dependencies in a dedicated stage to ensure a clean environment
FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Clean npm cache to ensure a fresh install
RUN npm cache clean --force

# Install dependencies using the appropriate package manager
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 4. Production image, copy only the necessary files for a smaller final image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder
COPY --from=builder /app/public ./public

# Set the correct permissions for the .next folder
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the standalone output from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

EXPOSE 3000
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]