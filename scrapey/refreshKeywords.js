var config = require('../lib/config/config'),
    mongoose = require('mongoose'),
    db = mongoose.connect(config.mongo.uri, config.mongo.options),
    TIBW = require('../lib/models/tibw'),
    Blog = require('../lib/models/blog');

Blog.find({})
    .limit(1) // temporarily limit
    .exec(function (err, blogs) {
        blogs.forEach(function (blog) {
            console.log('blog:', blog);
            blog.save();
        });
    });

TIBW.find({})
    .limit(1) // temporarily limit
    .exec(function (err, tibws) {
        tibws.forEach(function (tibw) {
            console.log('tibw:', tibw);
            tibw.save();
        });
    });
