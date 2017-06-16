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

  it("is created with a name", function(done) {
    var space = new Space({name: 'test2', userID: '5943a328cfdddbce7f22aca5'});
    space.save()
      .then(function() {
        Space.find({}, function(err, spaces) {
          expect(spaces[0].name).to.equal("test2");
          done();
        });
      });
  });

  it("is created with connection to the current User", function(done) {
    var space2 = new Space({name: 'test2', userID: '5943a328cfdddbce7f22aca5'});
    space2.save()
      .then(function() {
        Space.find({}, function(err, spaces) {
          expect(spaces[0].userID).to.equal("5943a328cfdddbce7f22aca5");
          done();
        });
      });
  });
});
