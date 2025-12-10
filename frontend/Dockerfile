FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL=${VITE_API_URL}
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm install
RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["serve", "-s", "dist", "-p", "5173"]