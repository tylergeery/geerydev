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
    *  Get keywords for comment and Blog search feature
    */
    extractKeywords: function (text) {
        var keywords = {},
            words;

        if (!text) return keywords;

        // TODO: Replace quote marks
        words = text.split(/\s+/)
            .filter(function (v) {
                return v.length > 2;
            })
            .filter(function (v) {
                return !/\<*\>/i.test(v);
            });

        words.forEach(function (w) {
            console.log('w:', w);
            if (keywords.hasOwnProperty(w)) {
                keywords[w].count++;
            } else {
                keywords[w] = {
                    value: w,
                    count: 1
                };
            }
        });
    }
};
