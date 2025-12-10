ARG NODE_VERSION=22.19.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
