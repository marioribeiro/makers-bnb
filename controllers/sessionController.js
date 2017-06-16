var User = require('../models/user');

exports.session_delete_post = function(req, res) {
  req.session.current_user_id = null;
  res.redirect('/');
};

