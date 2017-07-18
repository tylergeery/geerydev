'use strict';

var index = require('./controllers'),
    blog = require('./controllers/blog'),
    comment = require('./controllers/comment'),
    projects = require('./controllers/projects'),
    subscriber = require('./controllers/subscriber'),
    users = require('./controllers/users'),
    images = require('./controllers/images'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    // enforce ssl
    app.get('*', function (req, res, next) {
        console.log('req.headers:', req.headers['x-forwarded-proto']);
        if (req.headers['x-forwarded-proto'] != 'https') {
            console.log('req:', req.hostname, req.originalUrl);

            if (req.hostname) {
                res.redirect(301, 'https://' + req.hostname + req.originalUrl);
            }
        } else {
            next();
        }
    });

    // projects api
    app.get('/api/projects', projects.getProjects);
    app.post('/api/projects', middleware.auth, projects.postProjects);
    app.put('/api/projects', middleware.auth, projects.updateProjects);
    app.del('/api/projects/:id', middleware.auth, projects.deleteProjects);

    // subscribers api
    app.post('/api/subscribe', subscriber.addSubscriber);
    app.get('/api/subscribers', middleware.auth, subscriber.getSubscribers);
    app.get('/api/subscribers/:id/preferences', subscriber.savePreferences);

    // blogs api
    app.get('/api/blogs', blog.getBlogs);
    app.get('/api/blogs/:id', blog.getBlogs);
    app.post('/api/blogs', blog.postBlogs);
    app.put('/api/blogs/:id', middleware.auth, blog.updateBlog);
    app.del('/api/blogs/:id', middleware.auth, blog.deleteBlog);
    app.get('/api/blogs/search/:keyword', blog.searchBlogs);

    // comments api
    app.get('/api/comments/:blogId', comment.comments);
    app.get('/api/comments/like/:id', comment.likeComment);
    app.post('/api/comments', comment.postComments)
    app.del('/api/comments/:id', middleware.auth, comment.deleteComment)

    // users api
    app.get('/api/users', middleware.auth, users.list);
    app.post('/api/users', middleware.auth, users.create);
    app.put('/api/users', middleware.auth, users.changePassword);
    app.get('/api/users/me', middleware.auth, users.me);
    app.get('/api/users/:id', middleware.auth, users.show);
    app.del('/api/users/:id', middleware.auth, users.deleteUser);

    // adding images
    app.post('/api/images', middleware.auth, images.addImages);

    // authentication
    app.post('/api/session', session.login);
    app.get('/api/session/logout', middleware.auth, session.logout);

    // non-api routes
    app.get('/', index.index);
    app.get('/login', index.login);
    app.get('/moderate*', middleware.auth, index.admin);
    app.get('/requests', index.index);
    app.get('/requests/:id', index.post);
    app.get('/portfolio', index.portfolio);
    app.get('/about', index.about);
    app.get('/preferences/:hash', index.preferences);

    // lets encrypt
    app.get('/.well-known/acme-challenge/u6OicboGZocDd-QY4T7OySzKnjI_LQgQL6WdaJ0eHrw', function(req, res) {
      res.send('u6OicboGZocDd-QY4T7OySzKnjI_LQgQL6WdaJ0eHrw.VacMdJF5bWTawpfpvr9krfTrN_RlwMpAScU-X_RuPjc');
    });

    app.get('/*', index.error);
};
