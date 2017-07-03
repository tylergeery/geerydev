'use strict';

var mongoose = require('mongoose'),
    passport = require('passport');

/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};

/**
 * Login
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || info) {
        console.log('err: ', err || info);
        return res.redirect('/login?error=' + encodeURIComponent(err || info));
    }

    req.logIn(user, function(err) {

      if (err) {
          return res.redirect('/login?error=' + encodeURIComponent(err));
      }

      res.redirect('/moderate');
    });
  })(req, res, next);
};
