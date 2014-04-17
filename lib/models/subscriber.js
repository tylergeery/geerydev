'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    
/**
 * SubscriberSchema
 */
var SubscriberSchema = new Schema({
  email: {type: String},
  created: {type: Date, default: Date.now}
});

mongoose.model('Subscriber', SubscriberSchema);
