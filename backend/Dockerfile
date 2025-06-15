FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 8000
CMD [ "node", "index.js" ]