# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build the app
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built app from the builder stage
COPY --from=builder /app ./

ENV NODE_ENV production
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
