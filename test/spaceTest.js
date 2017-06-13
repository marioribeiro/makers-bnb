var mongoose = require('mongoose');
var expect = require('expect.js');
var assert = require('assert');
mongoose.connect('mongodb://localhost/makersbnb_test');

describe('Space', function() {

  var Space = require('../models/space');
  var space;

  beforeEach(function(done){
    Space.remove({}, function(){
      done();
    });
  });

  it("Check that a Space is being added to the database", function(done) {
    var space = new Space({name: 'test'});
    space.save(function(){
      Space.find({}, function(err, spaces) {
        expect(spaces[0].name).to.equal("test");
        done();
      });
    });
  });

});
