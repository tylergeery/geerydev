'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extractKeywords = require('../middleware').extractKeywords;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  content: {type: String},
  blogId: {type:String},
  created: {type:Date, default: Date.now},
  name: {type:String, default: 'Anonymous'},
  email: {type:String},
  responseTo: {type:String},
  responseHead: {type:String},
  likes: {type:Number, default: 0}
});

CommentSchema.pre('save', function(next) {
  if(!this.responseTo) {
      this.responseTo = this.blogId;
  }

  next();
});


module.exports = mongoose.model('Comment', CommentSchema);
