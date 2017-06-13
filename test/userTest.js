var mongoose = require('mongoose');
var expect = require('expect.js');
mongoose.connect('mongodb://localhost/makersbnb_test');

var User = require('../models/user');

beforeEach(function(done){
    User.remove({}, function(err){});
    var testUserDefault = new User({ name: 'Testings', email: "test_default@test.com", password: 'test_password'});
    testUserDefault.save(function(err){
      done()
    })
  });

describe('User', function() {

  it("creates user", function(done){
    var testUser = new User({ name: 'Testings', email: "test@test.com", password: 'test_password'});
    testUser.save();
    User.find({"email": "test@test.com"}, function(err, users) {
      console.log(users);
      expect(users[0].email).to.equal("test@test.com");
      done();
    });
    
  });

})