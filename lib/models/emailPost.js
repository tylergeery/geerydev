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
  token: {type: String},
  recipient: {type: String},
  sender: {type: String},
  signature: {type: String},
  'stripped-html': {type: String},
  from: {type: String},
  'content-id-map': {type: String},
  'message-headers': {type: String},
  to: {type: String},
  attachments : {type: String}
},{
  strict: false
});

mongoose.model('EmailPost', EmailPostSchema);
