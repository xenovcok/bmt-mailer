var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var templateSchema = new Schema({
	template_alias:String,
	nama:String,
	konten:String,
	kategori:String
});

var Template = mongoose.model('Template', templateSchema);
module.exports.Template = Template;