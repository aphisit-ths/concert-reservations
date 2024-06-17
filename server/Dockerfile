FROM node:20.14.0 AS builder

WORKDIR /app

ARG serverPort=4000

COPY package*.json ./

RUN npm install

COPY . .


RUN npx prisma generate

RUN npm run test:cov

RUN npm run build

FROM node:20.14.0-slim AS final

RUN apt-get update -y \
    && apt-get -y install openssl \
    && apt-get clean

WORKDIR /server

COPY --from=builder /app/dist /server/dist
COPY --from=builder /app/prisma /server/prisma
COPY --from=builder /app/node_modules /server/node_modules
COPY --from=builder /app/package*.json /server/
COPY --from=builder /app/.env /server/.env

RUN npm run dev:reset

EXPOSE ${serverPort}

CMD ["npm", "run","start:prod"]