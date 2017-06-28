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

  // projects api
  app.get('/api/projects', projects.getProjects);
  app.post('/api/projects', middleware.auth, projects.postProjects);
  app.post('/api/projects/:id', middleware.auth, projects.updateProjects);
  app.del('/api/projects/:id', middleware.auth, projects.deleteProjects);

  // subscribers api
  app.post('/api/subscribe', api.addSubscriber);
  app.get('/api/subscribers', middleware.auth, api.getSubscribers);

  // blogs api
  app.post('/api/blogs', middleware.auth, api.postBlogs);
  app.get('/api/blogs', api.getBlogs);
  app.get('/api/blogs/:id', api.getBlogs);
  app.put('/api/blogs/:id', middleware.auth, api.updateBlog);
  app.del('/api/blogs/:id', middleware.auth, api.deleteBlog);
  app.get('/api/blogs/search/:keyword', api.searchBlogs);

  // comments api
  app.get('/api/comments/:blogId', api.comments);
  app.get('/api/comments/like/:id', api.likeComment);
  app.post('/api/comments', api.postComments)
  app.del('/api/comments/:id', middleware.auth, api.deleteComment)

  // users api
  app.post('/api/users', users.create);
  app.put('/api/users', middleware.auth, users.changePassword);
  app.get('/api/users/me', middleware.auth, users.me);
  app.get('/api/users/list', middleware.auth, users.list);
  app.get('/api/users/:id', middleware.auth, users.show);
  app.del('/api/users/:id', middleware.auth, users.deleteUser);

  // adding images
  app.post('/api/images', middleware.auth, images.addImages);

  // authentication
  app.post('/api/session', session.login);
  app.del('/api/session', middleware.auth, session.logout);

  // non-api routes
  app.get('/', index.index);
  app.get('/login', index.login);
  app.get('/moderate', middleware.auth, index.admin);
  app.get('/requests', index.index);
  app.get('/requests/:id', index.post);
  app.get('/portfolio', index.portfolio);
  app.get('/about', index.about);

  app.get('/*', index.error);
};
