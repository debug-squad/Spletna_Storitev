var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var infrastructureSchema = new Schema({
	'title' : String,
	'type' : String,
	'tags' : [String],

	//
	//
	//

	'address' : String,

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

	//
	// Modification fields
	//

	'created' :  { type: Date, default: () => new Date(), required: true },
	'modified' : { type: Date, default: () => new Date(), required: true },
});

infrastructureSchema.index({ location: '2dsphere' });
infrastructureSchema.methods.view = function() {
	return {
		...this._doc,
	};
};


module.exports = mongoose.model('infrastructure', infrastructureSchema);
