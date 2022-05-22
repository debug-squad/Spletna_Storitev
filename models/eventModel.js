var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
	'title' : { type: String, required: true },
	'description' : { type: String, required: true },

	'organization' : { type: String, required: false },
	'contact' : { type: String, required: false },
	'price' : { type: String, required: false },
	'tags' : { type: [String], required: true },
	'image_url' : { type: String, required: true },
	'site_url' : { type: String, required: false },

	'location': {
		'type': {
		  'type': String, 
		  'enum': ['Point'],
		  'required': true
		},
		'coordinates': {
		  'type': [Number],
		  'required': true
		}
	},

	'date_start' : { type: Date, required: true },
	'date_end' : { type: Date, required: false },
	
	//
	//
	//

	'attendace': { type: Number, default: 0, required: true },

	'created' :  { type: Date, default: () => new Date(), required: true },
	'modified' : { type: Date, default: () => new Date(), required: true },
});
eventSchema.index({ location: '2dsphere' });
eventSchema.methods.view = function() {
	return {
		...this._doc,
	};
};


module.exports = mongoose.model('event', eventSchema);
