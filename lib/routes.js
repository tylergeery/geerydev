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

  // projects api
  app.get('/api/projects', projects.getProjects);
  app.post('/api/projects', middleware.auth, projects.postProjects);
  app.post('/api/projects/:id', middleware.auth, projects.updateProjects);
  app.del('/api/projects/:id', middleware.auth, projects.deleteProjects);

  // subscribers api
  app.post('/api/subscribe', subscriber.addSubscriber);
  app.get('/api/subscribers', middleware.auth, subscriber.getSubscribers);

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
  app.post('/api/users', middleware.auth, users.create);
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
