FROM node:20-slim AS build
WORKDIR /server
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM build AS app
ARG serverPort=4000

WORKDIR /server
COPY --from=build ./server ./ --ignore=node_modules/
EXPOSE $serverPort