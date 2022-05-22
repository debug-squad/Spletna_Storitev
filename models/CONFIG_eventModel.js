var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CONFIG_eventSchema = new Schema({
	'interval' : Number,
	'CSS_selector' : String,
	'created' : Date,
	'modified' : Date
});

module.exports = mongoose.model('CONFIG_event', CONFIG_eventSchema);
