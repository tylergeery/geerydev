'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    EmailPost = mongoose.model('EmailPost');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  res.render('index');
};

exports.tinder = function(req, res) {
  res.render('tinder');
};

exports.email = function(req, res) {
  console.log('Email Posts found:', JSON.stringify(EmailPost.find({})));
  res.render('content', {content : JSON.stringify(EmailPost.find({}))});
};

