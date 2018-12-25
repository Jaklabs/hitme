const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');

router.route('/')
	// GET all chats
	.get((req, res, next) => {
		Chat.find((err, chats) => {
			if (err) return next(err);
			res.status(200).json(chats);		
		});
	})
	// Create new chat
	.post((req, res, next) => {
		Chat.create({
			name: req.body.name,
			messages: [],
			members: req.body.members
		}, (err, chat) => {
			if (err) return next(err);
			res.status(201).send();
			console.log(chat.toString());
		});
		
	})

router.route('/:id')
	.get((req, res, next) => {
		Chat.findById(req.params.id, (err, chat) => {
			if (err) return next(err);
			res.status(200).json(chat);
		})
	})
	// Update chat message stream
	.put((req, res, next) => {
		Chat.findByIdAndUpdate(req.params.id, {
			messages: [...this.messages, req.body.message]
		}, (err) => {
			if (err) return next(err);
			res.status(201).send();
		})
	});


router.route('/clear').delete((req, res, next) => {
	console.log('Here we go...');
	Chat.deleteMany((err) => {
		if (err) return next(err);
		console.log('The deed is done!');
	});
});

module.exports = router;