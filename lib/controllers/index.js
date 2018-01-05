'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    timeUtils = require('../../js/src/utils/time'),
    ObjectId = mongoose.Types.ObjectId;

/**
 * Send our single page app
 */
exports.index = function (req, res) {
    res.layout('layouts/main', {
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else',
            script: 'index.js',
            stylesheets: []
        }, {
            content: {
                block: 'blog',
                data: {}
            }
        });
};

exports.post = function (req, res) {
    return Blog.findById({ _id: ObjectId(req.params.id) }, function (err, blog) {
        if (!err) {
            res.layout('layouts/main', {
                    title: 'GeeryDev Ramblings on Programming, Life, and Whatever else',
                    script: 'single.js',
                    stylesheets: []
                }, {
                    content: {
                        block: 'single',
                        data: {
                            blogId: blog._id,
                            request: blog.question,
                            response: blog.response,
                            dayString: timeUtils.iso8601ToDay(blog.created, true),
                            dateString: timeUtils.iso8601ToPretty(blog.created, true)
                        }
                    }
                });
        }
    });
};

exports.portfolio = function (req, res) {
    res.layout('layouts/main', {
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- Portfolio',
            script: 'portfolio.js',
            stylesheets: []
        }, {
            content: {
                block: 'portfolio',
                data: {}
            }
        });
};

exports.about = function (req, res) {
    res.layout('layouts/main', {
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- About',
            script: 'about.js',
            stylesheets: []
        }, {
            content: {
                block: 'about',
                data: {}
            }
        });
};

exports.preferences = function (req, res) {
    var self = this;

    // find subscriber
    return Subscriber.find({ hash: req.params.hash }).exec(function (err, subscriber) {
        // 404 if user not found
        if (err || !subscriber) {
            return self.error(req, res);
        }

        res.layout('layouts/main', {
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- Email Preferences',
            script: 'preferences.js',
            stylesheets: []
        }, {
            content: {
                block: 'preferences',
                data: {
                    subscriber: subscriber
                }
            }
        });
    });
};

/**
 * Renders the sudoku page
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.sudoku = function (req, res) {
    res.layout('layouts/main', {
            title: 'GeeryDev Sudoku Solver - Constraint Satisfaction Problem',
            script: 'sudoku.js',
            stylesheets: ['sudoku.css']
        }, {
            content: {
                block: 'sudoku',
                data: {}
            }
        });
};

exports.error = function (req, res) {
    res.layout('layouts/main', {
            title: 'GeeryDev 404',
            script: 'common.js',
            stylesheets: []
        }, {
            content: {
                block: '404',
                data: {}
            }
        });
};

exports.admin = function (req, res) {
    res.layout(
        'layouts/admin',
        {
            title: 'GeeryDev Admin Page',
            stylesheets: []
        },
        {
            content: {
                block: 'admin',
                data: {}
            }
        }
    );
};

exports.login = function (req, res) {
    res.layout(
        'layouts/simple',
        {
            title: 'GeeryDev Login',
            stylesheets: []
        },
        {
            content: {
                block: 'login',
                data: {
                    error: decodeURIComponent(req.query.error)
                }
            }
        }
    );
};
