'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    Subscriber = mongoose.model('Subscriber'),
    Mail = require('../services/mail'),
    blogService = require('../services/blog'),
    arrayUtils = require('../../js/src/utils/array'),
    ObjectId = mongoose.Types.ObjectId,
    _ = require('lodash');

/**
 * Get all blogs
 */
exports.getBlogs = function (req, res) {
    var exists = req.query.exists || 'response';
    var limit = req.query.per_page || 10;
    var page = req.query.page || 1;
    var sort = (req.query.sort === 'comments') ? '-totalComments' : '-created';

    if (req.params.id) {
        return Blog.findById({ _id: ObjectId(req.params.id) }, function (err, blog) {
            if (!err) {
                return res.json(blog);
            }

            return res.error(err);
        });
    }

    return blogService
        .query({}, 'question totalComments created askedBy', exists, sort, (page - 1) * limit, limit)
        .then(function (blogs) {
            if (req.query.sort === 'mystery') {
                blogs = arrayUtils.shuffleRandom(blogs);
            }

            return res.send(blogs);
        }, function (err) {
            console.log('Twas an error: ' + err);
            return res.send(err);
        });
};

exports.postBlogs = function (req, res) {
    console.log('POST: ' + JSON.stringify(req.body));
    var blog,
        postBody = _.pick(
            req.body,
            ['question', 'askedBy', 'email']
        );

    // ensure only admins can submit responses
    if (req.body.response && req.isAuthenticated()) {
        postBody.response = req.body.response;
    }

    blog = new Blog(postBody);

    return blog.save(function (err, blog) {
        if (err) console.log('Error: ' + err);
        if (blog) console.log('Saved!' + blog);

        if (postBody.response) {
            return Subscriber.find({}).exec(function (err, subscribers) {
                subscribers.forEach(function (subscriber) {
                    Mail.newPost(subscriber.email, blog.question, blog._id);
                });

                return res.send(blog);
            });
        }

        return res.send(blog);
    });
};

exports.updateBlog = function (req, res) {
    console.log('PUT: ' + JSON.stringify(req.body));
    return Blog.findById(req.params.id, function (err, blog) {
        var hadResponse = !!blog.response;

        blog.response = req.body.response || blog.response;
        blog.question = req.body.question || blog.question;
        blog.askedBy = req.body.askedBy || blog.askedBy;

        return blog.save(function (err, updated) {
            if (!err) {
                // Need to send an email if no response has been made yet
                if (!hadResponse && updated.response) {

                    return Subscriber.find({}).exec(function (err, subscribers) {
                        subscribers.forEach(function (subscriber) {
                            Mail.newPost(subscriber.email, blog.question, blog._id);
                        });

                        // Need to send a response to asker of the question
                        if (!hadResponse && updated.email) {
                            Mail.createMessage(
                              updated.email,
                              'Question',
                              updated.question,
                              updated.response,
                              'Tyler',
                              updated._id);
                        }

                        return res.send(updated);
                    });
                }
            } else {
                console.log('Error: ' + JSON.stringify(err));
                return res.send(err);
            }

            return res.send(blog);
        });
    });
};

exports.deleteBlog = function (req, res) {
    if (req.params.id) {
        return Blog.findById(req.params.id, function (err, blog) {
            if (!err) {
                return blog.remove(function (err) {
                    if (!err) return res.send(true);
                });
            }

            return res.send(err);
        });
    }
};

exports.searchBlogs = function (req, res) {
    if (req.params.keyword.length) {
        var regexParts = decodeURIComponent(req.params.keyword)
            .toLowerCase()
            .split(/\s+/)
            .map(function (term) {
                return new RegExp(term + '.*');
            });

        return Blog
            .find({
                'keywords.value': { $in: regexParts },
                response: { $exists: true }
            }, { email: 0, keywords: 0 })
            .limit(10)
            .exec(function (err, results) {
                if (!err) {
                    return res.send(results);
                } else {
                    return res.send([]);
                }
            });
    }

    return res.send([]);
};

exports.geeryDevTIBWClassifier = function (req, res) {
    var query = decodeURIComponent(req.query.query)
            .toLowerCase()
            .split(/\s+/)
            .slice(0, 5), // limit length initially
        i, countGD = 22, countTIBW = 14, total = countGD + countTIBW,
        facets = {
            $facet: {}
        };

    if (query.length) {
        /**
         * Steps to classification
         *
         * (1) Get counts of documents TIBW && GD
         * (2a) Get prior P-GD = countGD/total
         * (2b) Get prior P-TIBW = countTIBW/total
         * (3) For each w in query, get GD-countW and TIBW-countW
         * (4) P-GD *= GD-countW/totalCountW, P-TIBW *= TIB-countW/totalCountW
         * (5) Make a judgment about how likely one case is vs the other
         */
        return new Promise((resolve, reject) => {
            // build facet query
            for (i = query.length - 1; i >= 0; i--) {
                facets.$facet[query[i]] = [
                    {
                        $match: {
                            'keywords.value': query[i]
                        }
                    },
                    {
                        $bucket: {
                            groupBy: '$totalComments',
                            boundaries: [0, 500], //TODO
                            output: {
                                count: { $sum: 1 }
                            }
                        }
                    }
                ];
            }

            return blogService
                .aggregate([facets])
                .then(result => {
                    console.log('result:', result);
                    return res.json(result);
                }, err => {
                    console.log('err:', err);
                    return res.status(500).json(err);
                });
        });
    }

    return res.status(400).json({ error: 'Please provide a query to classify' });
};
