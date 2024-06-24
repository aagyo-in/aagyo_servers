FROM node:18 AS backend-builder

WORKDIR /app

COPY . .

RUN npm install


FROM node:18-slim

WORKDIR /app

COPY --from=backend-builder /app .

EXPOSE 3000


CMD [ "npm" ,"run","start"]
