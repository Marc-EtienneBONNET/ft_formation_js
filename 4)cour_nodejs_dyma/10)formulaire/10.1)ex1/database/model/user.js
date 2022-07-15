const mongoose = require('mongoose');
const schema = mongoose.Schema({
	mail:String,
	password:String
});

const user = mongoose.model('user', schema, 'user');

module.exports = {
	user:user
}