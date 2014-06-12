var mongoose = require('mongoose'),
    Project = mongoose.model('Project');
/**
 * Get all blogs
 */

exports.getProjects = function(req, res) {
    
    return Project.find({}).sort('-created').exec(function (err, projects) {
      if (!err) {
        return res.send(projects);
      } else {
        console.log("Twas an error: " + JSON.stringify(err));
        return res.send(err);
      }
    });

}

exports.postProjects = function(req, res) {

    console.log("Project: " + JSON.stringify(req.body));
    var project = new Project(req.body);
    return project.save(function (err, project) {
      if(err) return res.send(err);
      return res.send(project);
    });
}

exports.updateProjects = function(req, res) {

    console.log("Project: " + JSON.stringify(req.body));
    return Project.findById(req.params.id, function(err, project) {
      project.type = req.body.type;
      project.title = req.body.title;
      project.link = req.body.link;
      project.detail = req.body.detail;
      return project.save(function(err, project) {
        if(err) return res.send(err);
        return res.send(project);
      });
    });
}

exports.deleteProjects = function(req,res) {
  if(req.params.id) {
    return Project.findById(req.params.id, function(err, project) {
      if(!err) {
        return project.remove(function(err) {
          if(!err) return res.send(true);
        });
      }

      return true;
    });
  }
};