var mongoose =  require('mongoose');

var Schema =  mongoose.Schema;

var groupSchema =  new Schema({
	groupId:String,
	memberId:String
});

var Group = mongoose.model('Group', groupSchema);
module.exports.Group = Group;