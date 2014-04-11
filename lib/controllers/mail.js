// This is the mail file for generating the notification emails

var nodemailer = require("nodemailer");

exports.createMessage = function(rec, subj, orig, reply, replyName, link) {

	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "geerybot@gmail.com",
	        pass: "smores55"
	    }
	});
	
	// Create the content prior to configuring mail options
	var subject = "GeeryDev " + subj;
	var text = "You have received a response to your " + subj.toLowerCase() + " on GeeryDev.com. Your "+subj.toLowerCase()+": '" + orig + "' has received a reply from " + replyName + ":" + reply;
	var html = "<p style='font-size:2em;'><img style='padding-right:5px;' src='http://www.gravatar.com/avatar/72fed696e67b00b5f49df7c70f60f74d.png' /> <b>GeeryDev</b></p><p>You have received a response to your " + subj.toLowerCase() + " on GeeryDev.com.</p><p> Your "+subj.toLowerCase()+":</p><p style='background:#e5e5e5; padding:20px;'> " + orig + "</p><p> has seen a reply from <b>"+replyName+"</b></p><p style='background:#e5e5e5; padding:20px;'> " + reply + "</p><p>See the full post <a href=www.geerydev.com/requests/"+link+">Here</a>";

	// setup e-mail data with unicode symbols   			
	var mailOptions = {
	    from: "GeeryBot ✔ <geerybot@gmail.com>", // sender address
	    to: rec, // list of receivers
	    subject: subject, // Subject line should be Geerydev comment or Geerydev Reply
	    text: text, // plaintext body
	    html: html // html body
	}
	
	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }
	
	    // if you don't want to use this transport object anymore, uncomment following line
	    //smtpTransport.close(); // shut down the connection pool, no more messages
	});
}