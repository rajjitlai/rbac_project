FROM node:18

WORKDIR /app

# Install build tools + sqlite3 dev libraries
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm install

COPY . .

RUN mkdir -p db

EXPOSE 3000

CMD ["node", "app.js"]
