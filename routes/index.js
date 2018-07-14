var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET registration form */
router.get('/register', (req, res, next) => {
	res.render('register')
})

module.exports = router;
