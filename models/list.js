var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var listSchema = new Schema({
	list_nama:String,
	deskripsi:String,
	perusahaan:String,
	alamat:String,
	kota:String,
	kode_pos:String,
	negara:String,
	no_telp:String,
	list_id:String,
	notif:Number
});

var List = mongoose.model('List', listSchema);
module.exports.List = List;