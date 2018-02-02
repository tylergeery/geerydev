'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    Comment = mongoose.model('Comment'),
    Mail = require('../services/mail'),
    ObjectId = mongoose.Types.ObjectId,
    _ = require('lodash');

exports.comments = function (req, res) {
    var query = {};

    if (req.params.blogId) {
        query.blogId = req.params.blogId;
    }

    return Comment
        .find({ blogId: req.params.blogId })
        .sort({ created: 1, responseTo: 1 })
        .exec(function (err, comments) {
            if (!err) {
                return res.send(comments);
            } else {
                console.log('Twas an error: ' + err);
                return res.send(err);
            }
        });
};

exports.postComments = function (req, res) {
    var commentBody = _.pick(
            req.body,
            ['content', 'blogId', 'name', 'email', 'responseTo', 'responseHead']
        ),
        comment = new Comment(commentBody);

    return comment
        .save(function (err, saved) {
                if (err || !saved) {
                    return res.send(err);
                }

                return Blog
                .findById(comment.blogId, function (err, blog) {
                    if (err || !blog) {
                        console.log(err);
                        return res.send(err);
                    }

                    blog.totalComments++;

                    return blog.save(function (err, blog) {
                        if (err) {
                            return res.error(err);
                        }

                        // Need to send an email to responseTo person
                        // Only if this is not a direct reply to the blog
                        if (saved.blogId !== saved.responseTo) {
                            Comment
                                .findById(saved.responseTo, function (err, originalComment) {
                                    // do we have an email for og comment?
                                    if (originalComment && originalComment.email) {
                                        Mail.createMessage(
                                            originalComment.email,
                                            'Comment',
                                            saved.content,
                                            originalComment.content,
                                            originalComment.name,
                                            saved.blogId
                                        );
                                    }

                                    return res.send(saved);
                                });
                        } else {
                            Mail.createMessage(
                                'tyler.geery@yahoo.com',
                                'Comment',
                                saved.content,
                                'One of your blogs',
                                'You Tyler',
                                saved.blogId
                            );

                            return res.send(saved);
                        }
                    });
                });
            });
};

exports.likeComment = function (req, res) {
    if (req.params.id) {
        return Comment
            .findById(req.params.id, function (err, comment) {
                comment.likes++;

                return comment
                    .save(function (err, comment) {
                        return res.send(comment);
                    });
            });
    }
};

exports.deleteComment = function (req, res) {
    if (req.params.id) {
        return Comment
            .findById(req.params.id, function (err, comment) {
                if (!err) {
                    var blogId = comment.blogId;

                    return Blog.findById(blogId, function (err, blog) {
                        blog.totalComments--;
                        blog.save();

                        return comment.remove(function (err) {
                            return res.send(true);
                        });
                    });
                }
            });
    }
};
