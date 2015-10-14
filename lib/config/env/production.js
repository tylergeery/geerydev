'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://heroku_app23222967_A:wGLkRlpkoWdWdmxZyGAeaSwawWgRyQNY@ds043047.mongolab.com:43047/heroku_app23222967'
  }
};