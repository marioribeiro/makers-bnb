var mongoose = require('mongoose'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
// sligthly changed the package requirement
// instead of import should and expect we can import chai
// chai has all of them: assert, expect, should


mongoose.connect('mongodb://localhost/makersbnb_test');

describe('Space', function() {

  var Space = require('../models/space');

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

// this is just a maybe better version of the previous test, it implements the use of the .then keyword
// that is part of Mocha
  it("Check that a Space is being added", function(done) {
    var space = new Space({name: 'test2'});
    space.save()
    // we can use the .then keyword to avoid nesting the rest of the test inside the save()
    // the next lines are going to be executed only after save() is done
      .then(function() {
        Space.find({}, function(err, spaces) {
          expect(spaces[0].name).to.equal("test2");
          done();
        });
      });
  });



});
