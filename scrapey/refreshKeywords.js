var config = require('../lib/config/config'),
    mongoose = require('mongoose'),
    db = mongoose.connect(config.mongo.uri, config.mongo.options),
    middleware = require('../lib/middleware'),
    TIBW = require('../lib/models/tibw'),
    Blog = require('../lib/models/blog'),
    blogsCount = 0, blogsDone = false,
    tibwCount = 0, tibwDone = false;

Blog.find({})
    .batchSize(100)
    .exec(function (err, blogs) {
        blogs.forEach(function (blog) {
            blog.save();
            blogsCount++;

            if (blogsCount === blogs.length) {
                blogsDone = true;
            }
        });
    });

TIBW.find({})
    .batchSize(100)
    .exec(function (err, tibws) {
        tibws.forEach(function (tibw) {
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
