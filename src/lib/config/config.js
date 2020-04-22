'use strict';

/**
 * Load environment configuration
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    env: process.env.ENV || 'dev',
    root: rootPath,
    port: 8080,
    mongo: {
        uri: process.env.MONGO_HOST,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    },
    sessionSecret: process.env.SESSION_SECRET || 'session_secret',
    mailPass: process.env.MAIL_PASS
};
