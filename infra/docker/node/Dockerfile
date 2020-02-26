FROM node:10 as builder

WORKDIR /usr/src/app

COPY ./server .

EXPOSE 8080



FROM builder as prod

RUN npm ci --only=production

CMD [ "npm", "start" ]



FROM builder as dev

RUN npm install
RUN npm install nodemon

CMD [ "npm", "run", "start:dev" ]
