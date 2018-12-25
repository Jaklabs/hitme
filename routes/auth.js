const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const settings = require('../config/settings');

const sendToken = (user) => {
	jwt.sign({id: user.id}, settings.secret, {
		expiresIn: 60 * 60 // Expires in one hour
	}, (err, token) => {
		if (err) return next(err);
		console.log("Here's a token!")
		return res.status(200).json({token: token});
	});	
}

router.route('/register')
	// Register (create) new user
	.post((req, res, next) => {
		console.log('Registering user!');
		// Encrypt password before saving to database
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) return next(err);
			const newUser = new User({
				username: req.body.username,
				password: hash,
				chats: []
			});
			newUser.save((err, user) => {
				if (err) console.log(err);
				sendToken();
			});
		});
	});

router.route('/login')
	// Log in user
	.post((req, res, next) => {
		console.log("Posted a log in request!");
		User.findOne({username: req.body.username}, (userError, user) => {
			if (userError) return res.status(404).json({error: 'User not found.'});
			console.log("Found requested user!");
			bcrypt.compare(req.body.password, user.password, (passwordError, response) => {
				if (passwordError) return res.status(400).json({error: 'Password invalid.'});
				if (response) {
					console.log("Nice password!");
					sendToken(user);
					next();
				} else {
					return res.status(400).json({error: 'Password incorrect.'});
				}
			});
		});
	});

// Todo: - Add log out
module.exports = router;