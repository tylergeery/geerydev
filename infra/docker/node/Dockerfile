FROM node:10 as builder

WORKDIR /usr/src/app

COPY ./src .
RUN npm install

EXPOSE 8080



FROM builder as dev

ENV MONGO_HOST 'mongodb://geerydev:password@gd-mongodb:27017/geerydev?authSource=admin&gssapiServiceName=mongodb'
ENV ENV 'dev'
ENV NODE_ENV 'dev'
ENV SESSION_SECRET 'session_secret'
ENV MAIL_PASS=''

CMD [ "npm", "run", "start:dev" ]



FROM builder as prod

CMD [ "npm", "start" ]