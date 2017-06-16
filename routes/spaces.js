var express = require('express');
var router = express.Router();
var Space = require('../models/space');

router.get('/', function(req, res, next) {
  Space.find({}, function(err, spaces) {
    res.render('spaces/index', {spaces: spaces});
  });
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
