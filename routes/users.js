const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

router.route('/')
	// Get all users
	.get((req, res, next) => {
	  User.find((err, users) => {
	  	if (err) return next(err);
	  	return res.status(200).json(users);
	  });
	})
	// Create new user
	.post((req, res, next) => {
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) return next(err);
			var newUser = new User({
				username: req.body.username,
				password: hash
			});
			newUser.save((err, user) => {
				if (err) return next(err);
				return res.status(201).send();
				console.log(user);
			});

		});
	});

router.route('/:id')
	.get((req, res, next) => {
		// Get user by ID
		User.findById(req.params.id, (err, user) => {
			if (err) return next(err);
			return res.status(200).send();
		})
	})
	.delete((req, res, next) => {
		// Delete user by ID
		User.deleteOne(req.params.id, (err, user) => {
			if (err) return next(err);
			return res.status(200).send();
		});
	});


module.exports = router;
