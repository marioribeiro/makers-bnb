var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController')

/* GET home page. */

router.get('/', function(req, res) {
  sess = req.session
  if (sess.current_user_id) {
    user_controller.current_user_get(sess.current_user_id, function(user) {
    res.render('index', { message: user.email });
  });

} else
res.render('index', { message: "amigo" }); 
});


module.exports = router;
