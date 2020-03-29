'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
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
            Blog.aggregate(options)
                .exec((err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result);
                });
        });
    },

    /**
     * Wrapper for querying blog posts
     *
     * @param {Object} find
     * @param {String} exists
     * @param {String} sort
     * @param {Integer} offset
     * @param {Integer} limit
     */
    query: function (find, select, exists, sort, offset, limit) {
        return new Promise(function (resolve, reject) {
            Blog.find(find)
                .select(select)
                .exists(exists)
                .sort(sort)
                .skip(offset)
                .limit(limit)
                .exec(function (err, blogs) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(blogs);
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
            Blog.find(find)
                .exists(exists)
                .count()
                .exec(function (err, postCount) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(postCount);
                });
        });
    },
};
