'use strict';

var values = require('object.values');

if (!Object.values) {
    values.shim();
}

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
    *  Get keywords for comment and Blog search feature
    */
    extractKeywords: function (text) {
        var keywords = {},
            words;

        if (!text) return keywords;

        words = text
            .replace(/<script[^\>]*>.*<\/script>/g, ' ')
            .replace(/<\/?(h1|h2|h3|h4|h5|h6|b|ul|li|p|div|small|a)[^\>]*>/g, ' ') // strip html tags
            .replace(/<(link|img)[^\>]*\/>/g, ' ')
            .split(/\s+/)
            .filter(function (v) {
                return v.length > 2;
            });

        words.forEach(function (w) {
            w = w.replace(/[^\w\-]+/g, '');

            if (keywords.hasOwnProperty(w)) {
                keywords[w].count++;
            } else {
                keywords[w] = {
                    value: w,
                    count: 1
                };
            }
        });

        return Object.values(keywords);
    }
};
