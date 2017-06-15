var User = require('../models/user');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;
// var session = require('express-session');
// ^ This might be a problem - we set up our session in app.js then overwrite it here.
// Commenting it out and creating a user still works.
mongoose.connect('mongodb://localhost/makersbnb_test');



exports.user_create_post = function(req, res) {
  var newUser = new User({
   name: req.body.name,
   email: req.body.email,
   password: bcrypt.hashSync(req.body.password, 10)
  });

  console.log(newUser);
  newUser.save();
  var sess = req.session;
  sess.current_user_id = newUser._id;
  res.redirect('/');
};

exports.current_user_get = function(id, callback) {
  User.find({ '_id': id }, function(err, users) {
    console.log('users:')
    console.log(users);
    callback(users[0]);
  });
};