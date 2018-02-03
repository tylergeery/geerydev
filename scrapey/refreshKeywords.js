var config = require('../lib/config/config'),
    mongoose = require('mongoose'),
    db = mongoose.connect(config.mongo.uri, config.mongo.options),
    middleware = require('../lib/middleware'),
    TIBW = require('../lib/models/tibw'),
    Blog = require('../lib/models/blog'),
    blogsCount = 0, blogsDone = false,
    tibwCount = 0, tibwDone = false;

Blog.find({})
    .limit(100)
    .exec(function (err, blogs) {
        blogs.forEach(function (blog) {
            blog.keywords = middleware.extractKeywords(blog.question + ' ' + blog.response);
            blog.save();
            blogsCount++;

            if (blogsCount === blogs.length) {
                blogsDone = true;
            }
        });
    });

TIBW.find({})
    .limit(100)
    .exec(function (err, tibws) {
        tibws.forEach(function (tibw) {
            tibw.keywords = middleware.extractKeywords(tibw.title + ' ' + tibw.content);
            tibw.save();
            tibwCount++;

            if (tibwCount === tibws.length) {
                tibwDone = true;
            }
        });
    });

function wait() {
    if (tibwDone && blogsDone) {
        mongoose.disconnect();
    } else {
        setTimeout(wait, 200);
    }
};

wait();
