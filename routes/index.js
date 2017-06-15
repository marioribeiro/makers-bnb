var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController')

/* GET home page. */

router.get('/', function(req, res) {
  sess = req.session
  user_controller.current_user_get(sess.current_user_id, function(user) {
    res.render('index', { message: user.email });
  });
});


module.exports = router;
