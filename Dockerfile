# === Stage 1: Build the Application ===
# Use a Node.js image to install dependencies and build the app
FROM node:20-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# --- ADD THIS NEW BLOCK ---
# Create the .env file with the required public variables for the build
RUN echo "NEXT_PUBLIC_SITE_NAME=AI Interview" >> .env && \
    echo "NEXT_PUBLIC_SITE_DESC=AI Interview from G-Brain" >> .env && \
    echo "NEXT_PUBLIC_SITE_URL=https://dota-duta.netrikastag.dedyn.io" >> .env
# --------------------------

# Run the Next.js build command
RUN npm run build


# === Stage 2: Production Image ===
# Start from a fresh, minimal Node.js image
FROM node:20-slim AS runner

# Set the working directory
WORKDIR /app

# Set the environment to production for performance optimizations
ENV NODE_ENV=production

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built application from the 'builder' stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose the port that Next.js runs on by default
EXPOSE 3000

# The command to start the optimized Next.js server
CMD ["npm", "start"]