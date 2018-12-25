const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
	username: String,
	password: String,
	chats: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}]
});

const User = mongoose.model('User', UserSchema)
module.exports = User;