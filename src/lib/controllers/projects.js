var mongoose = require('mongoose'),
    Project = mongoose.model('Project');
/**
 * Get all blogs
 */

exports.getProjects = function (req, res) {
    return Project.find({}).sort('-created').exec(function (err, projects) {
        if (!err) {
            return res.send(projects);
        } else {
            console.error(err);
            return res.send(err);
        }
    });
};

exports.postProjects = function (req, res) {
    var project = new Project(req.body);

    return project.save(function (err, project) {
        if (err) return res.send(err);
        return res.send(project);
    });
};

exports.updateProjects = function (req, res) {
    return Project.findById(req.body._id, function (err, project) {
        project.type = req.body.type || project.type;
        project.title = req.body.title || project.title;
        project.link = req.body.link || project.link;
        project.detail = req.body.detail || project.detail;

        return project.save(function (err, project) {
            if (err) return res.send(err);
            return res.send(project);
        });
    });
};

exports.deleteProjects = function (req, res) {
    if (req.params.id) {
        return Project.findById(req.params.id, function (err, project) {
            if (!err) {
                return project.remove(function (err) {
                    if (!err) return res.send(true);
                });
            }

            return true;
        });
    }
};
