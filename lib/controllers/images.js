'use strict';

	var fs = require('fs'),
  	path = require('path');

exports.addImages = function(req, res) {
	console.log("POSTED FILES: " + JSON.stringify(req.files));

	fs.readFile(req.files.file.path, function (err, data) {
			path.exists("/../../app/images/uploads/"+req.files.file.name, function(exists) {
				if (exists) {
					fs.unlink("/../../app/images/uploads/"+req.files.file.name);
				}
				var newPath = __dirname + "/../../app/images/uploads/"+req.files.file.name;
  				fs.writeFile(newPath, data, function (err) {
    				if(err) {throw err;}

    				// Return the pages with the images
    				else {
    					res.send(req.files.file);
					}
  				}); 
			});
		});
};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	