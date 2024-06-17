# Stage 1: Build stage
FROM node:20-slim AS build

WORKDIR /client

# Copy package.json and install dependencies
COPY ./package.json ./
RUN npm install

# Copy all source files except .env.local (for security)
COPY . .
RUN rm -f .env.local  # Remove .env.local if mistakenly copied


# Copy .env.local securely (ensure it's in .gitignore)
COPY .env.local ./

# Build your application
RUN npm run build

# Stage 2: Runtime stage
FROM node:20-slim AS app

ARG clientPort=3000

WORKDIR /client

# Copy built files and dependencies from build stage
COPY --from=build /client ./

# Expose the port on which the app runs
EXPOSE $clientPort

# Command to run the application
CMD ["npm", "start"]
