var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var weatherSchema = new Schema({
	'temp' : Number,
	'wind' : Number,
	'humidity' : Number,
	'cloudiness' : String,
	'rain' : {
		'type':	String,
		'velocity': Number,
	}
});
weatherSchema.methods.view = function() {
	return {
		...this._doc,
	};
};

module.exports = mongoose.model('weather', weatherSchema);
