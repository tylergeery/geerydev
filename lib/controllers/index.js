'use strict';

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
    res.layout('layouts/main',{
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else',
            script: 'common.js'
        }, {
            content: {
                block: 'single',
                data: {}
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
