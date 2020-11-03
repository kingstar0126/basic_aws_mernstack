FROM node:12.14 as builder

RUN mkdir /projectClient
WORKDIR /projectClient

COPY client/package.json client/package.json

RUN npm install --silent

COPY . .

RUN npm run-script build

FROM node:12.14

RUN mkdir /project
WORKDIR /project

RUN apt-get update && apt-get upgrade

COPY package.json package.json

RUN npm install --silent

COPY . .

CMD npm start
