const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const settings = require('../config/settings');

router.route('/register')
	// Register (create) new user
	// TODO:
	// - Add "confirm password"
	// - Check for blank fields
	// - Length and quality of password
	// - Email address for account confirmation and password reset

	.post((req, res, next) => {
		// Make sure user is not in database alredy.
		User.findOne({username: req.body.username}).then(user => {
			if (user) { // If user already exists:
				return res.status(400).json({error: "User already exists."}); // Return error
			} else { // Otherwise, 
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						console.log(err);
						return res.status(400).json({error: "There was an error creating user."})
					}
					// Create user object. 
					const newUser = new User({
						username: req.body.username,
						password: hash,
						chats: []
					});
					// Begin saving user to database. 
					newUser.save((err, user) => {
						if (err) { 
							console.log(err);
							return res.status(400).json({error: "There was an error creating user."});
						}
						// Generate JSON Web token containing user ID.
						jwt.sign({id: user.id}, settings.secret, {
							expiresIn: 60 * 60 // Token expires in one hour
						}, (err, token) => {
							if (err) return next(err);
							return res.status(200).json({token: token}); // Send token to user.
						});	
					});
				});
	
			}
		});
	});


router.route('/login')
	// Log in user
	// TODO:
	// - Check for blank fields
	// - "Forgot password" -- after email integration added

	.post((req, res, next) => {
		// Search for username in database.
		User.findOne({username: req.body.username}, (userError, user) => {
			// If user does not exist, send error. 
			if (userError) return res.status(404).json({error: 'User not found.'});

			// Otherwise, begin comparing submitted password with the hashed password in the database. 
			bcrypt.compare(req.body.password, user.password, (passwordError, response) => {
				if (passwordError) {
					// Is this error redundant? (see line 84)
					return res.status(400).json({error: 'Password invalid.'});
				}
				// If password is correct: 
				if (response) { 
					// Generate JSON Web token containing user ID.
					jwt.sign({id: user.id}, settings.secret, {
						expiresIn: 60 * 60 // Expires in one hour
					}, (err, token) => {
						if (err) return next(err);
						return res.status(200).json({token: token}); // Send token to user
					});	
				// Otherwise (password is incorrect):
				} else {
					// Is this error redundant?
					return res.status(400).json({error: 'Password invalid.'});
				}
			});
		});
	});

// Todo: - Add log out
module.exports = router;