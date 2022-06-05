var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var attendanceSchema = new Schema({
	'event' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'event'
	},
	'timestamp' : { type: Date, default: () => new Date(), required: true },
});
attendanceSchema.methods.view = function() {
	return {
		...this._doc,
	};
};

module.exports = mongoose.model('attendance', attendanceSchema);
