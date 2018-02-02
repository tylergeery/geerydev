'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extractKeywords = require('../middleware').extractKeywords;

/**
 * Blog Schema
 */
var TIBWSchema = new Schema({
    title: { type: String },
    created: { type: Date, default: Date.now },
    content: { type: String },
    keywords: [{
        value: {
            type: String
        },
        count: {
            type: Number
        }
    }]
});

TIBWSchema.pre('save', function (next) {
    var tmp = this.title + ' ' + this.content;

    this.keywords = extractKeywords(tmp.toLowerCase());
    next();
});

module.exports = mongoose.model('TIBW', TIBWSchema);
