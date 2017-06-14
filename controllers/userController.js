var User = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/makersbnb_test');

exports.user_create_post = function(req, res) {
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save();
  res.render('index', { message: 'Form submitted successfully' });
};
