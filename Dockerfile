# Use Node.js 18 as base image (switch to non-Alpine for better compatibility)
FROM node:18

# Set working directory
WORKDIR /app

# Install build tools and SQLite dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and install dependencies (with native module rebuild)
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Create db directory and initialize database
RUN mkdir -p db && touch db/rbac.db

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]