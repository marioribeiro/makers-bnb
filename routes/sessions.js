var express = require('express');
var router = express.Router();

var session_controller = require('../controllers/sessionController');

router.post('/', session_controller.session_delete_post);

module.exports = router;
