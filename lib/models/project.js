'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extractKeywords = require('../middleware').extractKeywords;

/**
 * Comment Schema
 */
var ProjectSchema = new Schema({
  type: {type: String, default: 'web'},
  image: {type:String},
  created: {type:Date, default: Date.now},
  title: {type:String},
  link: {type:String},
  detail: {type:String}
});

ProjectSchema.pre('save', function(next) {
  if(this.type == 'web') {
    this.image = 'http://s27.postimg.org/69fxresjz/web.png';
  } else if(this.type == 'mobile') {
    this.image = '/images/158c8114.mobile.png';
  } else {
    this.image = '/images/9101ba57.finance.png';
  }
  next();
});


module.exports = mongoose.model('Project', ProjectSchema);
