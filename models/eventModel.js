var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
	'title' : String,
	'desription' : String,
	'tags' : [String],

	//
	//
	//

	'attendace': { type: Number, default: 0, required: true },

	//
	// Entry info
	//

	'entry_type': String,
	'entry_cost': String,

	//
	// Location
	//

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

	'infrastructure': { type: mongoose.Schema.Types.ObjectId, ref: 'infrastructure' },

	//
	// Contact info
	//

	'contacts': {
		'phone': String,
		'email': String,
	},

	//
	// Social media links
	//

	'social_medias' : {
		'facebook': String,
		'twitter': String,
		'instagram': String,
	},
	
	//
	// Duration
	//

	'duration': {
		from: Date,
		to: Date
	},

	//
	// Modification fields
	//

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
