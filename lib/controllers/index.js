'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    EmailPost = mongoose.model('EmailPost');

/**
 * Send our single page app
 */
exports.index = function(req, res) {
    var block,
        data = {},
        title = 'GeeryDev Ramblings on Programming, Life, and Whatever else';

    switch (req.url) {
        case '/':
        case '/requests':
        case '/requests/':
            block = 'blog';
            break;
        case '/about':
        case '/about/':
            block = 'main';
            break;
        case '/portfolio':
        case '/portfolio/':
            block = 'portfolio';
            break;
        default:
            block = 'blog';
            break;
    }

    res.layout(
        'layouts/main',
        {
            title: title
        },
        {
            content: {
                block: block,
                data: data
            }
        }
    );
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
}

exports.login = function(req, res) {
    res.render('login');
}

exports.email = function(req, res) {
  console.log('Email Posts found:', JSON.stringify(EmailPost.find({})));
  res.render('content', {content : JSON.stringify(EmailPost.find({}))});
};
