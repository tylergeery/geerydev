'use strict';

var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    Comment = mongoose.model('Comment'),
<<<<<<< HEAD
    Subscriber = mongoose.model('Subscriber'),
=======
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb
    Mail = require('./mail'),
    ObjectId = mongoose.Types.ObjectId;
/**
 * Get all blogs
 */

exports.getBlogs = function(req, res) {
  console.log("QUERY : " + JSON.stringify(req.query));

  /* Build a Query object based on params */
  var query = {};

  if(req.params.id) {

    query._id = req.params.id;
    console.log("QUERY ID: " + query._id);
    return Blog.findById({_id:ObjectId(query._id)}, function(err, blog) {
      if(!err) {
        return res.json(blog);
      } else {
        console.log("Error!");
        return res.error(err);
      }
      
    });

  } else {

    var exists = req.query.exists || 'question';
<<<<<<< HEAD
    console.log("Exists: " + exists);

    var limit = req.query.limit || 50;
    var filter = req.query.filter ? '-'+req.query.filter.toString() : '-created'
    // console.log("Filter: " + filter);
=======
    var limit = req.query.limit || 50;
    var filter = req.query.filter ? '-'+req.query.filter.toString() : '-created'
    console.log("Filter: " + filter);
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb
    
    return Blog.find({}, {email:0, keywords:0}).exists(exists).sort(filter).limit(limit).exec(function (err, blogs) {
      if (!err) {
        return res.send(blogs);
      } else {
        console.log("Twas an error: " + JSON.stringify(err));
        return res.send(err);
      }
    });
  }  
    
};

exports.sumBlogs = function(req,res) {
  return Blog.find({}, {email:0, keywords:0}).sort({created:-1}).select('_id question').exec(function(err,blogs) {
    if (!err) {
        return res.send(blogs);
      } else {
        console.log("Twas an error: " + JSON.stringify(err));
        return res.send(err);
      }
  });
<<<<<<< HEAD
};
=======
} 
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb

exports.postBlogs = function(req, res) {
  console.log("POST: " + JSON.stringify(req.body));
  var blog = new Blog(req.body);
  return blog.save(function(err, blog) {
    if(err) console.log("Error: " + err);
    if(blog) console.log("Saved!" + blog);
<<<<<<< HEAD
    Subscriber.find({}).exec( function(err, subscribers) {
      subscribers.forEach(function(e,i,a) {
        Mail.newPost(e.email, blog.question, blog._id);;
      });
    });
    return res.send(blog);
  });
};
=======
    return res.send(blog);
  });
}
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb

exports.updateBlog = function(req, res) {
  console.log("PUT: " + JSON.stringify(req.body));
  return Blog.findById(req.params.id, function(err, blog) {
    // Need to send an email if no response has been made yet
    if(blog.email && !blog.response) {
<<<<<<< HEAD
      var subscribers = Subscriber.find({}).exec(function(err,subscribers) {
        for(i=0;i<subscribers.length;i++) {
          Mail.newPost(subscribers[i].email, blog.question, blog._id);
        }
      });
=======
      Mail.createMessage(blog.email, "Response", blog.question, blog.answer, "Tyler Geery");
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb
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

<<<<<<< HEAD
};
=======
}
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb

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
<<<<<<< HEAD
};


exports.addSubscriber = function(req,res) {
  if(req.body.email) {
    console.log("Got here");
    var subscriber = new Subscriber({email:req.params.email});
    return Subscriber.find({email:req.params.email}).exec(function(err, blog) {
      if(blog.length > 0) {
        return subscriber.save(function(err, s) {
          console.log("Got subscriber:", JSON.stringify(s));
          if(err) console.log("ERROR!");
          
          return res.send(true);
        });
      } else {
        return res.send(false);
      }
    });
  } 
};
=======
}

>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb
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
<<<<<<< HEAD
};
=======
}
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb

exports.likeComment = function(req, res) {
  if(req.params.id) {
    return Comment.findById(req.params.id, function(err, comment) {
      comment.likes++;
      return comment.save(function(err, comment) {
        return res.send(comment);
      });
    });
  }
<<<<<<< HEAD
};
=======
}
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb

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
<<<<<<< HEAD
};
=======
}
>>>>>>> c4567e480e942edb6052f841b30a8108ca35b2bb

exports.searchBlogs = function(req, res) {
  // console.log('SEARCH BLOGS: ' + JSON.stringify(req.params.keyword));
  var regex = decodeURIComponent(req.params.keyword) + '.*';
  if(req.params.keyword.length > 0) {
    console.log('TRUE');
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

