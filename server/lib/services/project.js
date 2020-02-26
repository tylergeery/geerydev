'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    ObjectId = mongoose.Types.ObjectId;

module.exports = {
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
            Project.find(find)
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
    }
};
