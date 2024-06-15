# Use an official Node.js runtime as a parent image
FROM node:20-slim AS build

WORKDIR /server

COPY package*.json ./


RUN npm install

COPY . .

RUN npx prisma migrate deploy
RUN npm run build

FROM node:20-slim AS app

ARG serverPort=4000

WORKDIR /server

COPY --from=build /server/dist /server/dist
COPY --from=build /server/node_modules /server/node_modules
COPY --from=build /server/package*.json /server/
COPY --from=build /server/.env /server/.env

EXPOSE ${serverPort}

CMD ["npm", "start:prod"]
