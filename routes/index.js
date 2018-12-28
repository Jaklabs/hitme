const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const settings = require('../config/settings');
const util = require('util');

/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('login')
  
});

/* GET registration form */
router.get('/register', (req, res, next) => {
	res.render('register')
});

/* GET main page. */
router.get('app', (req, res, next) => {
	res.render('app');
})
module.exports = router;
