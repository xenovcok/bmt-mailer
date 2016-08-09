var mongoose = require('mongoose');
var userSchema = mongoose.Schema;

userSchema = new Schema({
	username:String,
	password:String,
	email:String,
	nama_depan:String,
	nama_belakang:String,
	telp:String,
	role:Number
});

var User = mongoose.model('User', userSchema);
module.exports.User = User;