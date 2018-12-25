const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const settings = require('../config/settings');
const util = require('util');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login')
  
});

/* GET registration form */
router.get('/new', (req, res, next) => {
	res.render('new')
});
router.get('/register', (req, res, next) => {
	res.render('register')
});
router.get('/chat/:id', (req, res, next) => {
	res.render('chat')
});


module.exports = router;
