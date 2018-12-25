const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
	author: String,
	content: String
});

const ChatSchema = mongoose.Schema({
	name: String,
	messages: [MessageSchema],
	members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;