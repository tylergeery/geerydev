'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Subscriber = mongoose.model('Subscriber');

exports.addSubscriber = function(req,res) {
    if(req.body.email) {
        return Subscriber.find({email:req.body.email}).exec(function(err, scribe) {
            if (scribe.length < 1) {
                var subscriber = new Subscriber({email:req.body.email});
                return subscriber.save(function(err, s) {
                    console.log("Got subscriber:", JSON.stringify(s));
                    if(err) console.log("ERROR!");

                    return res.json(s);
                });
            }

            // pretend newly saved
            return res.json(scribe)
        });
    }

    return res.json({error: 'Must submit an email'});
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

exports.savePreferences = function(req, res) {
    // update user preferences
    return Subscriber.find({hash: req.body.hash}).exec(function(err, subscriber) {
        subscriber.preferences.general = req.body.general;
        subscriber.preferences.responses = req.body.responses;
        subscriber.preferences.comments = req.body.comments;

        return subscriber.save(function(err, subscriber) {
            if (err) return res.json({error: err})

            return res.json(subscriber);
        });
    });
};
