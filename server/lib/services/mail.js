// This is the mail file for generating the notification emails
var nodemailer = require('nodemailer'),
    config = require('../config/config');

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'geerybot',
        pass:  config.mailPass
    },
    debug: true // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'GeeryBot ✔ <geerybot@gmail.com>'
});

var sendMail = function (rec, subject, text, html) {
    // setup e-mail data with unicode symbols
    var message = {
        to: rec, // list of receivers
        subject: subject, // Subject line should be Geerydev comment or Geerydev Reply
        text: text, // plaintext body
        html: html // html body
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error (email send) occurred: ', error.message);
            return;
        }

        console.log('Message sent successfully! Server response: "%s"', info.ersponse);
        transporter.close();
    });
};

/**
 * Create a new email send for geeryDev comment
 *
 * @param {string} rec - recipient email
 * @param {string} subj - (reply|comment|post)
 * @param {string} orig - original comment content
 * @param {string} reply - reply to orig
 * @param {string} replyName - name provided by new commenter
 * @param {string} link - blogId
 */
exports.createMessage = function (rec, subj, orig, reply, replyName, link) {
    // Create the content prior to configuring mail options
    var subject = 'GeeryDev ' + subj,
        text = 'You have received a response to your ' + subj.toLowerCase() + ' on www.GeeryDev.com. Your ' + subj.toLowerCase() + ': "' + orig + '" has received a reply from ' + replyName + ':' + reply,
        html = '<p style="font-size:2em;"><img style="padding-right:5px;" src="http://www.gravatar.com/avatar/72fed696e67b00b5f49df7c70f60f74d.png" /> <b>GeeryDev</b></p>';
    html += '<p>You have received a response to your ' + subj.toLowerCase() + ' on GeeryDev.com.</p>';
    html += '<p> Your ' + subj.toLowerCase() + ':</p><p style="background:#e5e5e5; padding:20px;"> ' + orig + '</p>';
    html += '<p> has seen a reply from <b>' + replyName + '</b></p><p style="background:#e5e5e5; padding:20px;">' + reply + '</p>';
    html += '<p>See the full post <a href="http://www.geerydev.com/requests/' + link + '">Here</a>';

    sendMail(rec, subject, text, html);
};

/**
 * Create a new email send for a new geeryDev blog post
 *
 * @param {string} rec - recipient email
 * @param {string} title -  post title
 * @param {string} link - blogId
 */
exports.newPost = function (rec, title, link) {
    var subject = 'GeeryDev New Post',
        text = 'GeeryDev has published a new post.',
        html = '<p style="font-size:2em;"><img style="padding-right:5px;" src="http://www.gravatar.com/avatar/72fed696e67b00b5f49df7c70f60f74d.png"/><b>GeeryDev</b></p>';
    html += '<p>GeeryDev has published a new post regarding:</p>';
    html += '<p style="background:#e5e5e5; padding:20px;">' + title + '</p>';
    html += '<p>See the full post <a href="http://www.geerydev.com/requests/"' + link + '">Here</a>';

    sendMail(rec, subject, text, html);
};
