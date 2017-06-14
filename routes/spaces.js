var express = require('express');
var router = express.Router();
var Space = require('../models/space');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/makersbnb_test');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Test');
});

router.post('/', function(req, res, next) {
  var space = new Space({name: req.body.nameOfSpace});
  space.save(function() {
    res.redirect('/spaces')
  });
});

router.get('/new', function(req, res, next) {
  res.render('spaces/new');
});



module.exports = router;
