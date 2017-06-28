'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    timeUtils = require('../../js/src/utils/time'),
    ObjectId = mongoose.Types.ObjectId;

/**
 * Send our single page app
 */
exports.index = function(req, res) {
    res.layout('layouts/main',{
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else',
            script: 'index.js'
        }, {
            content: {
                block: 'blog',
                data: {}
            }
        });
};

exports.post = function(req, res) {
    return Blog.findById({_id:ObjectId(req.params.id)}, function(err, blog) {
        if(!err) {
            res.layout('layouts/main',{
                    title: 'GeeryDev Ramblings on Programming, Life, and Whatever else',
                    script: 'single.js'
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
}

exports.portfolio = function(req, res) {
    res.layout('layouts/main',{
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- Portfolio',
            script: 'portfolio.js'
        }, {
            content: {
                block: 'portfolio',
                data: {}
            }
        });
};

exports.about = function(req, res) {
    res.layout('layouts/main',{
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- About',
            script: 'about.js'
        }, {
            content: {
                block: 'about',
                data: {}
            }
        });
};

exports.error = function(req, res) {
    res.layout('layouts/main',{
            title: 'GeeryDev 404',
            script: 'common.js'
        }, {
            content: {
                block: '404',
                data: {}
            }
        });
};

exports.admin = function(req, res) {
    res.layout(
        'layouts/admin',
        {
            title: 'GeeryDev Admin Page'
        },
        {
            content: {
                block: 'admin',
                data: {}
            }
        }
    );
};

exports.login = function(req, res) {
    res.render('login');
};
