'use strict';

var mongoose = require('mongoose'),
    TIBW = mongoose.model('TIBW'),
    ObjectId = mongoose.Types.ObjectId;

module.exports = {
    /**
     * Wrapper for performing aggregations on blog posts
     *
     * @param {Object} options
     * @return Promise
     */
    aggregate: function (options) {
        return new Promise((resolve, reject) => {
            TIBW.aggregate(options)
                .exec((err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result);
                });
        });
    },

    /**
     * Wrapper for querying TIBW posts
     *
     * @param {Object} find
     * @param {String} exists
     * @param {String} sort
     * @param {Integer} offset
     * @param {Integer} limit
     * @return Promise
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
    },

    /**
     * Count the results that match a query
     *
     * @param {Object} find
     * @param {String} exists
     * @return Promise
     */
    count: function (find, exists) {
        return new Promise(function (resolve, reject) {
            TIBW.find(find)
                .exists(exists)
                .count()
                .exec(function (err, postCount) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(postCount);
                });
        });
    }
};
