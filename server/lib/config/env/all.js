'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 8086,
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    sessionSecret: process.env.SESSION_SECRET || 'tylerjacksongeery'
};
