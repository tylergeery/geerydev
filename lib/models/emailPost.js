'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * old Schema
 */
 /*
   var EmailPostSchema = new Schema({
    created: {type: Date, default: Date.now},
    email: {type: String},
    subject: {type: String},
    timestamp: {type: String},
    token: {type: String},
    recipient: {type: String},
    sender: {type: String},
    'stripped-signature': {type: String},
    'stripped-text': {type: String},
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
*/
/**
 * new Schema
 */
var EmailPostSchema = new Schema({
  created: {type: Date, default: Date.now},
  headers: {type: String},
  text: {type: String},
  html: {type: String},
  from: {type: String},
  to: {type: String},
  cc: {type: String},
  subject: {type: String},
  dkim: {type: String},
  SPF: {type: String},
  envelope: {type: String},
  charsets: {type: String},
  spam_score: {type: String},
  spam_report: {type: String},
  attachments : {type: String},
  'attachment-info': {type: String},
  attachmentX: {type: String}
},{
  strict: false
});

mongoose.model('EmailPost', EmailPostSchema);
