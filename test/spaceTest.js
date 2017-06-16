var mongoose = require('mongoose'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
var Space = require('../models/space');
var User = require('../models/user');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/makersbnb_test');

describe('Space', function() {


  var name = 'test2';
  var userID = '5943a328cfdddbce7f22aca5';
  var description = 'the most amazing place in the whole wide world';
  var price = 1;
  var userName= 'Testing';
  var email= 'test@test.com';
  var password= 'test_password';


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

  describe("#getUserName", function() {

    beforeEach(function(done) {
      var testUser = new User({
        name: 'Testing',
        email: 'test@test.com',
        password: 'test_password'
      });
      testUser.save(done);
    });

    beforeEach(function(done) {
      User.find({name: 'Testing'}, function(err, users){
        userID = users[0].id;
        space2 = new Space({name: name, userID: userID, description: description, price: price})
        space2.save(done);
      });
    });

    beforeEach(function(done) {
      User.find({id: userID}, function(err, users){
        console.log("users");
        done();
      });
    });

    it("returns the user's name", function(done) {
      console.log(Space.getUserName);
      Space.find({}, function(err, spaces) {
        console.log(spaces)
        expect(spaces[0].getUserName()).to.equal("Testing");
        done();
      });
    });

  });


});
