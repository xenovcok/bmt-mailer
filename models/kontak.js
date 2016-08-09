var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kontakSchema = new Schema({
	kontak_id:Number,
	nama:String,
	email:{type: String, unique: true},
	telp:String,
	alamat:String,
	group:String
});

var Kontak = mongoose.model('Kontak', kontakSchema);
module.exports.Kontak = Kontak;