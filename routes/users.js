var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/', user_controller.user_create_post);

module.exports = router;
