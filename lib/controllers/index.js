'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    timeUtils = require('../../js/src/utils/time'),
    blogService = require('../services/blog'),
    projectService = require('../services/project'),
    ObjectId = mongoose.Types.ObjectId;

import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import GeeryDevHeadBar from '../../js/src/containers/GeeryDevHeadBar';
import GeeryDevNavBar from '../../js/src/containers/GeeryDevNavBar';
import GeeryDevHomePanel from '../../js/src/containers/GeeryDevHomePanel';
import GeeryDevPostList from '../../js/src/containers/GeeryDevPostList';
import GeeryDevProjectList from '../../js/src/containers/GeeryDevProjectList';
import store from '../../js/src/store';
import postActions from '../../js/src/actions/post';
import projectActions from '../../js/src/actions/project';

/**
 * Add common layoutVars to layout parameter object
 */
function addToLayoutVars(layoutVars) {
    layoutVars.headerString = renderToString(
        <Provider store={store}>
            <GeeryDevHeadBar />
        </Provider>
    );
    layoutVars.navString = renderToString(
        <Provider store={store}>
            <GeeryDevNavBar />
        </Provider>
    );
    layoutVars.state = store.getState();

    return layoutVars;
}

/**
 * Send our single page app
 */
exports.index = function (req, res) {
    var exists = 'response';
    var limit = req.query.per_page || 10;
    var page = req.query.page || 1;
    var sort = '-created';

    return blogService
        .query({}, 'question totalComments created askedBy', exists, sort, (page - 1) * limit, limit)
        .then(function (blogs) {
            store.dispatch(postActions.setPostList(blogs));

            return res.layout('layouts/main', addToLayoutVars({
                    title: 'GeeryDev Ramblings on Programming, Life, and Whatever else',
                    script: 'index.js',
                    stylesheets: []
                }), {
                    content: {
                        block: 'blog',
                        data: {
                            postList: renderToString(
                                <Provider store={store}>
                                    <GeeryDevPostList />
                                </Provider>
                            ),
                            homePanel: renderToString(
                                <Provider store={store}>
                                    <GeeryDevHomePanel />
                                </Provider>
                            )
                        }
                    }
                });
        }, function (err) {
            console.log('Twas an error: ' + err);
            return this.err(req, res);
        });
};

exports.post = function (req, res) {
    return Blog.findById({ _id: ObjectId(req.params.id) }, function (err, blog) {
        if (!err) {
            res.layout('layouts/main', addToLayoutVars({
                    title: 'GeeryDev Ramblings on Programming, Life, and Whatever else',
                    script: 'single.js',
                    stylesheets: []
                }), {
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
    return projectService
        .query({}, 'type image created title link detail', 'title', '-created', 1, 10)
        .then((projects) => {
            console.log('projects:', projects);
            store.dispatch(projectActions.setProjectList(projects));

            return res.layout('layouts/main', addToLayoutVars({
                    title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- Portfolio',
                    script: 'portfolio.js',
                    stylesheets: []
                }), {
                    content: {
                        block: 'portfolio',
                        data: {
                            projectList: renderToString(
                                <Provider store={store}>
                                    <GeeryDevProjectList />
                                </Provider>
                            )
                        }
                    }
                });
        }, (err) => {
            console.log('Error fetching projects: ' + err);
            return this.err(req, res);
        });
};

exports.about = function (req, res) {
    res.layout('layouts/main', addToLayoutVars({
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- About',
            script: 'about.js',
            stylesheets: []
        }), {
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

        res.layout('layouts/main', addToLayoutVars({
            title: 'GeeryDev Ramblings on Programming, Life, and Whatever else -- Email Preferences',
            script: 'preferences.js',
            stylesheets: []
        }), {
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
    res.layout('layouts/main', addToLayoutVars({
            title: 'GeeryDev Sudoku Solver - Constraint Satisfaction Problem',
            script: 'sudoku.js',
            stylesheets: ['sudoku.css']
        }), {
            content: {
                block: 'sudoku',
                data: {}
            }
        });
};

/**
 * Render the initial view for GeeryDev vs TIBW Naive Bayes Classifier
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.geeryDevTIBWClassifier = function (req, res) {
    res.layout('layouts/main', addToLayoutVars({
            title: 'GeeryDev vs Throwing It Back Weekly - Naive Baayes Classifier',
            script: 'textClassifier',
            stylesheets: ['textClassifier']
        }), {
            content: {
                block: 'textClassifier',
                data: {}
            }
        });
};

/**
 * Renders a 404 Not Found page
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.error = function (req, res) {
    res.layout('layouts/main', addToLayoutVars({
            title: 'GeeryDev 404',
            script: 'common.js',
            stylesheets: []
        }), {
            content: {
                block: '404',
                data: {}
            }
        });
};

/**
 * Render admin layout
 */
exports.admin = function (req, res) {
    res.layout(
        'layouts/admin',
        addToLayoutVars({
            title: 'GeeryDev Admin Page',
            stylesheets: []
        }),
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
        addToLayoutVars({
            title: 'GeeryDev Login',
            stylesheets: []
        }),
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
