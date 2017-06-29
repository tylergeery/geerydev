'use strict';

var mongoose = require('mongoose'),
    hash = require('crypto').createHash('sha1'),
    config = require('../config/config')
    Schema = mongoose.Schema;


/**
 * SubscriberSchema
 */
var SubscriberSchema = new Schema({
  email: {type: String},
  hash: {type: String},
  created: {type: Date, default: Date.now}
});

SubscriberSchema.pre('save', function(next) {
    if (!this.hash) {
        this.hash = hash.update(config.hashSecret + this.email).digest('hex')
    }

    next();
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
