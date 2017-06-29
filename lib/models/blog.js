'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extractKeywords = require('../middleware').extractKeywords;


/**
 * Blog Schema
 */
var BlogSchema = new Schema({
  question: {type: String},
  askedBy: {type: String, default: "Anonymous"},
  created: {type: Date, default: Date.now},
  email: {type: String},
  response: {type: String},
  totalComments: {type: Number, default: 0},
  keywords: [String]
});


BlogSchema.pre('save', function(next) {
    var TempKey = this.question + ' ' + this.askedBy + ' ' + this.response;
	this.keywords = extractKeywords(TempKey.toLowerCase());
	next();
});

module.exports = mongoose.model('Blog', BlogSchema);
