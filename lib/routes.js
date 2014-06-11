'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    projects = require('./controllers/projects'),
    users = require('./controllers/users'),
    images = require('./controllers/images'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/blogs', api.getBlogs);
  app.get('/api/projects', projects.getProjects);
  app.post('/api/projects', middleware.auth, projects.postProjects);
  app.post('/api/projects/:id', middleware.auth, projects.updateProjects);
  app.del('/api/projects/:id', middleware.auth, projects.deleteProjects);
  app.post('/api/subscribe', api.addSubscriber);
  app.post('/api/blogs', middleware.auth, api.postBlogs);

  app.get('/api/blogs/sum', api.sumBlogs);
  app.get('/api/blogs/:id', api.getBlogs);
  app.put('/api/blogs/:id', middleware.auth, api.updateBlog);
  app.del('/api/blogs/:id', middleware.auth, api.deleteBlog);
  // app.get('/api/comments', api.comments_unApp);
  // app.get('/api/comments/top', api.comments_top);
  app.get('/api/comments/:id', api.comments);
  app.get('/api/comments/like/:id', api.likeComment);
  app.post('/api/comments', api.postComments)
  app.del('/api/comments/:id', middleware.auth, api.deleteComment)

  app.get('/api/blogs/search/:keyword', api.searchBlogs);
  app.get('/api/subscribers', middleware.auth, api.getSubscribers);
  app.post('/api/users', users.create);
  app.put('/api/users', middleware.auth, users.changePassword);
  app.get('/api/users/me', middleware.auth, users.me);
  app.get('/api/users/list', middleware.auth, users.list);
  app.get('/api/users/:id', middleware.auth, users.show);
  app.del('/api/users/:id', middleware.auth, users.deleteUser);
  app.post('/api/images', middleware.auth, images.addImages);

  app.post('/api/session', session.login);
  app.del('/api/session', middleware.auth, session.logout);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);

};