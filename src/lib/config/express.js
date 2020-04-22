'use strict';

var express = require('express'),
    ejsLayout = require('ejs-layouts'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    session = require('express-session'),
    favicon = require('express-favicon'),
    cookieParser = require('cookie-parser'),
    MongoStore = require('connect-mongo')(session);

/**
 * Express configuration
 */
module.exports = function (app) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
    app.use(express.static(path.join(config.root, 'js/dist')));

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.use(ejsLayout.express);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Change line
    // Persist sessions with mongoStore
    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            url: config.mongo.uri,
            collection: 'sessions'
        })
    }));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());
};
