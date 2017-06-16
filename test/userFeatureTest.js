process.env.NODE_ENV = 'test';
var server = require('../app');
var http = require('http');
var assert = require('assert');
var Browser = require('zombie');
var User = require('../models/user');

before(function(done) {
  this.server = http.createServer(server).listen(3000);
  this.browser = new Browser({ site: 'http://localhost:3000' });
  done();
});

describe('user signup page', function() {
  beforeEach(function(done) {
    this.browser.visit('/users', done);
  });


  after(function(done){
    User.remove({}, function(){
      done();
    });
  });

  it('should show a signup form', function(){
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), 'Sign Up');
    assert.equal(this.browser.text('form label'), 'Name:Email:Password:');
  });
});

describe('user creation', function() {
  before(function(done) {
    var browser = this.browser;
    browser
      .fill('input[name=name]', 'test_user')
      .fill('input[name=email]', 'webtest@test.com')
      .fill('input[name=password]', 'testx_password')
      .pressButton('Sign Up', done);
  });

  it('Creates a user account and welcomes the user with their email address', function() {
    assert.equal(this.browser.text('p#message'), 'Welcome webtest@test.com');
  });
});

describe('user logout', function() {

  beforeEach(function(done) {
    var browser = this.browser;
    browser.visit('/users').then(function(){  
      browser
        .fill('input[name=name]', 'test_userx')
        .fill('input[name=email]', 'webtest@test.comx')
        .fill('input[name=password]', 'testx_passwordx')
        .pressButton('Sign Up', done);
      });
  });
  
  it('allow user to logout from the account', function() {
    var browser = this.browser;
    browser.pressButton('Log out').then(function(){
      assert.equal(browser.text('p#message'), 'Welcome to MakersBNB');
    });
  });
});

after(function(done) {
  this.server.close(done);
});
