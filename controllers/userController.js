var User = require('../models/user');
var mongoose = require('mongoose');
// var session = require('express-session');
// ^ This might be a problem - we set up our session in app.js then overwrite it here.
// Commenting it out and creating a user still works.
mongoose.connect('mongodb://localhost/makersbnb_test');



exports.user_create_post = function(req, res) {
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save();
  var sess = req.session;
  sess.current_user_id = newUser._id;
  res.redirect('/');
};

exports.current_user_get = function(id, callback) {
  User.find({ '_id': id }, function(err, users) {
    callback(users[0]);
  });
};
