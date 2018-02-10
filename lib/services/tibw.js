'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('TIBW'),
    ObjectId = mongoose.Types.ObjectId;

module.exports = {
    /**
     * Wrapper for querying TIBW posts
     *
     * @param {Object} find
     * @param {String} exists
     * @param {String} sort
     * @param {Integer} offset
     * @param {Integer} limit
     */
    query: function (find, exists, sort, offset, limit) {
        return new Promise(function (resolve, reject) {
            TIBW.find(find)
                .exists(exists)
                .sort(sort)
                .offset(offset)
                .limit(limit)
                .exec(function (err, posts) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(posts);
                });
        });
    }
};
