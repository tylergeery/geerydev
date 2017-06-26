'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    Comment = mongoose.model('Comment'),
    Subscriber = mongoose.model('Subscriber'),
    Project = mongoose.model('Project'),
    EmailPost = mongoose.model('EmailPost'),
    Mail = require('./mail'),
    arrayUtils = require('../../js/src/utils/array'),
    ObjectId = mongoose.Types.ObjectId;

/**
 * Get all blogs
 */
exports.getBlogs = function(req, res) {
    var exists = req.query.exists || 'response';
    var limit = req.query.limit || 50;
    var sort = (req.query.sort === 'comments') ? '-totalComments' : '-created';

    if (req.params.id) {
        console.log("QUERY ID: " + req.params.id);
        return Blog.findById({_id:ObjectId(req.params.id)}, function(err, blog) {
            if(!err) {
                return res.json(blog);
            }

            console.log("Error!", err);
            return res.error(err);
        });

    }

    return Blog
                .find({}, {email:0, keywords:0})
                .exists(exists)
                .sort(sort)
                .limit(limit)
                .exec(function (err, blogs) {
                    if (!err) {
                        if (req.query.sort === 'mystery') {
                            blogs = arrayUtils.shuffle(blogs);
                        }

                        return res.send(blogs);
                    }

                    console.log("Twas an error: " + JSON.stringify(err));
                    return res.send(err);
                });

};

exports.getProjects = function(req,res) {
  return Project.find({}).exec(function(err, projects) {
    if(!err) {
      return res.send(projects);
    } else {
      console.log("Twas an error getting projects:", JSON.stringidy(err));
      return res.send(err);
    }
  });
}
exports.sumBlogs = function(req,res) {
  return Blog.find({}).sort({created:-1}).select('_id question').exec(function(err,blogs) {
    if (!err) {
        return res.send(blogs);
      } else {
        console.log("Twas an error getting Blog Summaries: " + JSON.stringify(err));
        return res.send(err);
      }
  });
};


exports.postBlogs = function(req, res) {
  console.log("POST: " + JSON.stringify(req.body));
  var blog = new Blog(req.body);
  return blog.save(function(err, blog) {
    if(err) console.log("Error: " + err);
    if(blog) console.log("Saved!" + blog);

    Subscriber.find({}).exec( function(err, subscribers) {
      subscribers.forEach(function(e,i,a) {
        Mail.newPost(e.email, blog.question, blog._id);;
      });
    });
    return res.send(blog);
  });
};


exports.updateBlog = function(req, res) {
  console.log("PUT: " + JSON.stringify(req.body));
  return Blog.findById(req.params.id, function(err, blog) {

    // Need to send an email if no response has been made yet
    if(!blog.response && req.body.response) {

      var subscribers = Subscriber.find({}).exist(email).exec(function(err,subscribers) {
        for(i=0;i<subscribers.length;i++) {
          if (subscribers[i].email) {
            Mail.newPost(subscribers[i].email, blog.question, blog._id);
          }
        }
      });
    }

    // Need to send a response to asker of the question
    if(blog.email) {
      Mail.createMessage(blog.email, "Question", blog.question, req.body.response, 'Tyler', blog._id);
    }

    blog.response = req.body.response;
    return blog.save( function(err, blog) {
      if(!err) {
        console.log('Updated');
        return res.send(blog);
      } else {
        console.log("Error: " +JSON.stringify(err));
        return res.send(err);
      }

      return res.send(blog);
    });
  });
};


exports.deleteBlog = function(req,res) {
  if(req.params.id) {
    return Blog.findById(req.params.id, function(err, blog) {
      if(!err) {
        return blog.remove(function(err) {
          if(!err) return res.send(true);
        });
      }

      return true;
    });
  }
};


exports.addSubscriber = function(req,res) {
  if(req.body.email) {
    console.log("Got here", JSON.stringify(req.body));
    var subscriber = new Subscriber({email:req.body.email});
    return Subscriber.find({email:req.body.email}).exec(function(err, scribe) {
      if(scribe.length < 1) {
        return subscriber.save(function(err, s) {
          console.log("Got subscriber:", JSON.stringify(s));
          if(err) console.log("ERROR!");

          return res.json(s);
        });
      } else {
        return res.send(false);
      }
    });
  }
};

exports.getSubscribers = function(req,res) {
  return Subscriber.find({}).exec(function (err, scribes) {
    if (!err) {
      return res.send(scribes);
    } else {
      console.log("Twas an error: " + JSON.stringify(err));
      return res.send(err);
    }
  });
};

// exports.comments_unApp = function(req,res) {
  // return Comment.find({approved:false}, function(err, comments) {
    // if(!err) {
      // return res.json(comments);
    // } else {
      // return res.send(err);
    // }
  // })
// }
//
// exports.comments_top = function(req,res) {
  // return Comment.find().sort(likes:-1).limit(50). function(err, comments) {
    // if(!err) {
      // return res.json(comments);
    // } else {
      // return res.send(err);
    // }
  // })
// }

exports.comments = function(req, res) {
  console.log("REQUEST: "+JSON.stringify(req.params));
  if(req.params.id) {
    return Comment.find({blogId:req.params.id}, {email:0}).sort({created:1, responseTo:1}).exec(function(err, comments){
      if(!err) {
        console.log("Twas comments: " + JSON.stringify(comments));
        return res.send(comments);
      } else {
        console.log("Twas an error: " + err);
        return res.send(err);
      }
    });
  } else {
    return Comment.find({}, {email:0}).sort({created:-1}).exec(function(err, comments) {
      if(!err) {
        return res.send(comments);
      } else {
        return res.send(err);
      }
    });
  }

};

exports.postComments = function(req,res) {
  console.log("REQUEST: " + JSON.stringify(req.body));
  var comment = new Comment(req.body.reply);
  return comment.save(function(err, saved) {
    if(err) console.log("Error: " + err);
    if(saved) console.log("Saved! " + saved);

    // Need to send an email to responseTo person
    // Only if this is not a direct reply to the blog
    if (saved._id !== saved.responseTo && saved.blogId !== saved.responseTo) {
      Comment.findById(saved.responseTo, function(err, ecomment) {
        if(ecomment.email) {
          Mail.createMessage(ecomment.email, "Comment", saved.content, ecomment.content, ecomment.name, saved.blogId);
        }
      });
    } else {
      Mail.createMessage("tyler.geery@yahoo.com", "Comment", saved.content, "One of your blogs", "You Tyler", saved.blogId);
    }

    return Blog.findById(comment.blogId, function(err, blog) {
      blog.totalComments++;
      return blog.save(function(err, comment){
        if(err) {return res.error(err);}
        return res.send(comment);
      });
    });
  });

};


exports.likeComment = function(req, res) {
  if(req.params.id) {
    return Comment.findById(req.params.id, function(err, comment) {
      comment.likes++;
      return comment.save(function(err, comment) {
        return res.send(comment);
      });
    });
  }
};


exports.deleteComment = function(req,res) {
  console.log("DELETE: " + JSON.stringify(req.params.id));
  if(req.params.id) {
    return Comment.findById(req.params.id, function(err, comment) {
      if(!err) {

        var blogId = comment.blogId;
        Blog.findById(blogId, function(err, blog) {
          blog.totalComments--;
          blog.save();
        });

        console.log('Deleted: ' + JSON.stringify(comment));
        return comment.remove(function(err) {
          return res.send(true);
        });
      }
    });
  }
};

exports.searchBlogs = function(req, res) {
    var regex = decodeURIComponent(req.params.keyword) + '.*';

    if(req.params.keyword.length) {
        return Blog.find({keywords: {$regex: regex, $options: 's'}}, {email:0, keywords:0}).limit(10).exec(function(err, results) {
            console.log('GOT HERE!!');
            if(!err) {
                return res.send(results);
            } else {
                return res.send(false);
            }
        });
    }
};

exports.emailPost = function(req, res) {
  console.dir(req.body);
  var thing = new EmailPost();

  for(var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      thing[key] = req.body[key];
    }
  }

  thing.save();

  return res.send(200);
}
