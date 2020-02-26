'use strict';

var express = require('express'),
    ejsLayout = require('ejs-layouts'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(express);

/**
 * Express configuration
 */
module.exports = function (app) {
    app.configure(function () {
        app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('views', config.root + '/views');
        app.use(express.static(path.join(config.root, 'js/dist')));

        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'ejs');
        app.use(ejsLayout.express);
        app.use(express.logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.multipart());
        app.use(express.cookieParser());

        // Persist sessions with mongoStore
        app.use(express.session({
            secret: config.sessionSecret,
            store: new MongoStore({
                url: config.mongo.uri,
                collection: 'sessions'
            })
        }));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // Router needs to be last
        app.use(app.router);
    });
};
