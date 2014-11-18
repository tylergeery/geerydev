'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    
/**
 * Blog Schema
 */
var EmailPostSchema = new Schema({
  created: {type: Date, default: Date.now},
  email: {type: String},
  subject: {type: String},
  timestamp: {type: String},
  token: {type: String}
},{
  strict: false
});

mongoose.model('EmailPost', EmailPostSchema);
