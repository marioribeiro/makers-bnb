process.env.NODE_ENV = 'test';
var server = require('../app');
var http = require('http');
var assert = require('assert');
var Browser = require('zombie');

before(function(){
  this.server = http.createServer(server).listen(3000)
  this.browser = new Browser({ site: 'http://localhost:3000' });
});

describe('user signup page', function(){

  beforeEach(function(done){
    this.browser.visit('/users', done);
  })

  it('should show a signup form', function(){
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), 'Sign Up');
    assert.equal(this.browser.text('form label'), 'Name:Email:Password:');
  });

  it('should take the user to a confirmation page', function() {
    this.browser.fill('input[name=name]', 'test_user');
    this.browser.fill('input[name=email]', 'test@test.com');
    this.browser.fill('input[name=password]', 'test_password');
    this.browser.document.forms[0].submit();
    this.browser.wait().then(function() {
      assert.equal(this.browser.text('p#message'), 'Form submitted successfully');
    }.bind(this));
  });
});

after(function(done){
  this.server.close(done);
});
