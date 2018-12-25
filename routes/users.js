const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

router.route('/')
	// Get all users
	.get((req, res, next) => {
	  User.find((err, users) => {
	  	if (err) return next(err);
	  	return res.status(200).json(users);
	  });
	});

// Token verification middleware
router.use('/:id', (req, res, next) => {
	let token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, settings.secret, (err, decoded) => {
			if (err) return res.status(500).json({auth: false, error: 'Token authentication failed.'})
			res.status(200).send(decoded);
			next();
		});
	} else {
		res.status(401).json({error: 'Unauthorized'});
		next();
	}
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
