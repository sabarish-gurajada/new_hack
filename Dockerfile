FROM node:alpine

COPY package.json package.json

RUN npm install

RUN npm build

CMD [ "npm", "start" ]