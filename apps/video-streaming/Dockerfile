# Stage 1: Build the application
FROM node:25-alpine3.22 AS builder

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
# We need the root package.json and package-lock.lock for nx commands
COPY ../../package*.json ./
RUN npm ci

# Copy the rest of the application
COPY ../../ .

# Build the video-streaming application
RUN npx nx build @flix-tube/video-streaming --configuration=production

# Stage 2: Create the final production image
FROM node:25-alpine3.22

WORKDIR /app

# Copy root package.json and package-lock.json for production dependencies
COPY ../../package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/apps/video-streaming/dist/ .

# Expose the port the app runs on
EXPOSE 80

# Command to run the built application
CMD [ "node", "main.js" ]