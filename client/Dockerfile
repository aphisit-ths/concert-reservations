FROM node:20-slim AS build

WORKDIR /client

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM build AS app

ARG clientPort=3000

WORKDIR /client

COPY --from=build ./client ./ --ignore=node_modules

EXPOSE $clientPort