const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');

router.route('/')
	// GET all messages
	.get((req, res, next) => {
		Chat.find((err, chats) => {
			if (err) return next(err);
			res.status(200).json(chats);		
		});

	})
	// POST new message
	.post((req, res, next) => {
		Chat.create({
			author: req.body.author, 
			content: req.body.content
		}, (err, chat) => {
			if (err) return next(err);
			res.status(201).send()
			console.log(chat.toString());
		});
		
	})

router.route('/clear').delete((req, res, next) => {
	console.log('Here we go...');
	Chat.deleteMany((err) => {
		if (err) return next(err);
		console.log('The deed is done!');
	});
});

module.exports = router;