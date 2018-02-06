'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    ObjectId = mongoose.Types.ObjectId;

module.exports = {
    /**
     * Wrapper for querying blog posts
     *
     * @param {Object} find
     * @param {string} exists
     * @param {string} sort
     * @param {integer} offset
     * @parm {integer} limit
     */
    query: function (find, exists, sort, offset, limit) {
        return new Promise(function (resolve, reject) {
            Blog.find(find)
                .exists(exists)
                .sort(sort)
                .offset(offset)
                .limit(limit)
                .exec(function (err, blogs) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(blogs);
                });
        });
    }
};
