'use strict';

var express = require('express'),
    ejs_layout = require('ejs-layouts'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express);

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.use(express.static(path.join(config.root, 'js/dist')));

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.use(ejs_layout.express);
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.multipart());
    app.use(express.cookieParser());

    // Persist sessions with mongoStore
    app.use(express.session({
      secret: 'tylerjacksongeery',
      store: new mongoStore({
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
