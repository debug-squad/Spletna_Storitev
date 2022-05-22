var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var configEventSchema = new Schema({
	'interval' : Number,
	'CSS_selector' : String,
	'created' : Date,
	'modified' : Date
});

module.exports = mongoose.model('config_event', configEventSchema);
