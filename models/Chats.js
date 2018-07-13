const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
	author: String,
	content: String
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;