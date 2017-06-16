var User = require('../models/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.user_create_post = function(req, res) {
  var newUser = new User({
   name: req.body.name,
   email: req.body.email,
   password: bcrypt.hashSync(req.body.password, 10)
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
