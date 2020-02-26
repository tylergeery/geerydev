require('../lib/models/tibw');

var config = require('../lib/config/config'),
    mongoose = require('mongoose'),
    db = mongoose.connect(config.mongo.uri, config.mongo.options),
    request = require('request'),
    cheerio = require('cheerio'),
    TIBW = mongoose.model('TIBW');

function getTIBWPosts() {
    return new Promise(function (resolve, reject) {
        var count = 0,
            queue = [],
            baseUrl = 'https://throwingitbackweekly.wordpress.com/',
            years = [2014, 2015];

        years.forEach(function (year) {
            request(baseUrl + year.toString() + '/', function (error, response, html) {
                count++;

                if (!error) {
                    var $ = cheerio.load(html),
                        $posts = $('.entry-title'),
                        total = total + $posts.length;

                    $posts.each(function () {
                        var $post = $(this),
                            title = $post.text(),
                            content = $post.parent().siblings('.entry-content').text(),
                            created = new Date(
                                Date.parse($post.siblings('.entry-meta').find('.entry-date').text())
                            ),
                            tibwPost = new TIBW();

                        tibwPost.title = title;
                        tibwPost.created = created;
                        tibwPost.content = content;

                        queue.push(tibwPost);
                    });
                }

                if (count === years.length) {
                    resolve(queue);
                }
            });
        });
    });
}

getTIBWPosts()
    .then(function (tibwPosts) {
        var count = 0;

        function increment() {
            count++;
            console.log('incrementing:', count, tibwPosts.length);

            if (count === tibwPosts.length) {
                mongoose.disconnect();
            }
        }

        tibwPosts.forEach(function (tibwPost) {
            TIBW.find({ title: tibwPost.title }).exec(function (err, posts) {
                if (err) {
                    console.error(err);
                    increment();
                } else if (posts.length) {
                    console.log('Post already exists:', posts[0].title);
                    increment();
                } else {
                    tibwPost.save(function (err, tibwPost) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('New post saved:', tibwPost.title);
                        }

                        increment();
                    });
                }
            });
        });
    });
