FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME /usr/src/app/src

CMD [ "npm", "run", "start:dev" ]
