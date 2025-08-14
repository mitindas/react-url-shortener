const mongoose = require('mongoose');

const urlModel = new mongoose.Schema({
	long_url: {
		type: String,
		required: true
	},

	short_url: {
		type: String,
		required: true,
		index: true,
		unique: true
	}
})

const urlSchema = mongoose.model('URL_Shortener_Project', urlModel);
module.exports = urlSchema;