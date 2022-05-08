var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var clientSchema = new Schema({
	"client_name" : { type: String, unique: true, required: true},

	"email": String,
	
	"password_hash": String,

	//
	//
	//

	"is_admin": { type: Boolean, default: false, required: true },

	//
	// Modification fields
	//

	'created' :  { type: Date, default: () => new Date(), required: true },
	'modified' : { type: Date, default: () => new Date(), required: true },
});
clientSchema.methods.view = function() {
	const out = {  ...this._doc, };
	delete out.password_hash;
	return out;
};

module.exports = mongoose.model('client', clientSchema);
