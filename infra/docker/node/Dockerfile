FROM node:10 as builder

WORKDIR /usr/src/app

COPY ./server .
RUN npm install

EXPOSE 8080



FROM builder as dev

CMD [ "npm", "run", "start:dev" ]



FROM builder as prod

CMD [ "npm", "start" ]