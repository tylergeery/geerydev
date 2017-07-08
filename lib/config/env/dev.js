'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var secrets = JSON.parse(fs.readFileSync(path.join(__dirname,'./secrets.json'), 'utf8'));

module.exports = _.extend(
    {
        env: 'dev', // tdoo bring nack 'development'
    },
    secrets
);
