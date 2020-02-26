'use strict';

var index = require('./controllers'),
    blog = require('./controllers/blog'),
    comment = require('./controllers/comment'),
    projects = require('./controllers/projects'),
    subscriber = require('./controllers/subscriber'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function (app) {

    // enforce ssl
    if (process.env.NODE_ENV === 'production') {
        app.get('*', function (req, res, next) {
            if (req.headers['x-forwarded-proto'] !== 'https' && req.get('host')) {
                // redirect for non https
                res.redirect(301, 'https://' + req.get('host') + req.originalUrl);
            } else if (!/^www\..*/i.test(req.get('host'))) {
                // redirect for non www
                res.redirect(301, 'http://www.' + req.get('host') + req.originalUrl);
            } else {
                next();
            }
        });
    }

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
    app.get('/api/geerdev-tibw-classifier', blog.geeryDevTIBWClassifier);

    // comments api
    app.get('/api/comments/:blogId', comment.comments);
    app.get('/api/comments/like/:id', comment.likeComment);
    app.post('/api/comments', comment.postComments);
    app.del('/api/comments/:id', middleware.auth, comment.deleteComment);

    // users api
    app.get('/api/users', middleware.auth, users.list);
    app.post('/api/users', middleware.auth, users.create);
    app.put('/api/users', middleware.auth, users.changePassword);
    app.get('/api/users/me', middleware.auth, users.me);
    app.get('/api/users/:id', middleware.auth, users.show);
    app.del('/api/users/:id', middleware.auth, users.deleteUser);

    // authentication
    app.post('/api/session', session.login);
    app.get('/api/session/logout', middleware.auth, session.logout);

    // non-api routes
    app.get('/', index.index);
    app.get('/about', index.about);
    app.get('/login', index.login);
    app.get('/moderate*', middleware.auth, index.admin);
    app.get('/portfolio', index.portfolio);
    app.get('/preferences/:hash', index.preferences);
    app.get('/requests', index.index);
    app.get('/requests/:id', index.post);
    app.get('/sudoku', index.sudoku);
    app.get('/classifier', index.classifier);

    // lets encrypt
    app.get('/.well-known/acme-challenge/u6OicboGZocDd-QY4T7OySzKnjI_LQgQL6WdaJ0eHrw', function (req, res) {
        res.send('u6OicboGZocDd-QY4T7OySzKnjI_LQgQL6WdaJ0eHrw.VacMdJF5bWTawpfpvr9krfTrN_RlwMpAScU-X_RuPjc');
    });

    app.get('/google344be072c4fd2e1c.html', function (req, res) {
        res.send('google-site-verification: google344be072c4fd2e1c.html');
    });

    app.get('/*', index.error);
};