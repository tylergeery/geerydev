'use strict';

module.exports = {
    env: 'production',
    mongo: {
        uri: process.env.MONGO_HOST
    },
    sessionSecret: process.env.SESSION_SECRET,
    mailPass: process.env.MAIL_PASS
};
