var mongoose = require('mongoose');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/makersbnb_test');

describe('User', function() {

  var User = require('../models/user')

  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
      done();
    });
  });

  describe('User creation', function() {
    it("creates user", function(done){
      var testUser = new User({ name: 'Testing', email: "test@test.com", password: 'test_password'});
      testUser.save(function() {
        User.find({"email": "test@test.com"}, function(err, users) {
          expect(users[0].name).to.equal("Testing");
          done();
        });
      });
    });
  });


  describe('User validation', function() {
    it('Does not create a user if an email is not passed', function(done) {
      var testUser = new User({name: 'testing', password: 'test_password'});
      testUser.validate(function(err) {
        expect(err.errors.email).to.exist;
        done();
      });
    });
  });
});
