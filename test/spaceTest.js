var mongoose = require('mongoose'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
var Space = require('../models/space');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/makersbnb_test');

describe('Space', function() {


  var name = 'test2';
  var userID = '5943a328cfdddbce7f22aca5';
  var description = 'the most amazing place in the whole wide world';
  var price = 1;


  afterEach(function(done){
    Space.remove({}, function(){
      done();
    });
  });

  beforeEach(function(done) {
    var space = new Space({name: name, userID: userID, description: description, price: price});
    space.save(done);
  });

  it("is created with a name", function(done) {
    Space.find({}, function(err, spaces) {
      expect(spaces[0].name).to.equal(name);
      done();
    });
  });

  it("is created with connection to the current User", function(done) {
    Space.find({}, function(err, spaces) {
      expect(spaces[0].userID).to.equal(userID);
      done();
    });
  });

  it("is created with a description", function(done) {
    Space.find({}, function(err, spaces) {
      expect(spaces[0].description).to.equal(description);
      done();
    });
  });

  it("is created with a price", function(done) {
    Space.find({}, function(err, spaces) {
      expect(spaces[0].price).to.equal(price);
      done();
    });
  });


});
