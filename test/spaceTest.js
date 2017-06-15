var mongoose = require('mongoose'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/makersbnb_test');

describe('Space', function() {

  var Space = require('../models/space');

  afterEach(function(done){
    Space.remove({}, function(){
      done();
    });
  });

  it("Check that a Space is being created", function(done) {
    var space = new Space({name: 'test2'});
    space.save()
      .then(function() {
        Space.find({}, function(err, spaces) {
          expect(spaces[0].name).to.equal("test2");
          done();
        });
      });
  });
});
