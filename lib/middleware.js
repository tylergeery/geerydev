'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    console.log('Blocked!');
    res.send(401);
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  },

  /**
   *  Get keywords for comment and Blog search feature
   */
  extractKeywords: function(text) {
    if (!text) return [];

    return text.
      split(/\s+/).
      filter(function(v) { return v.length > 2; }).
      filter(function(v, i, a) { return a.lastIndexOf(v) === i; });
  }

};