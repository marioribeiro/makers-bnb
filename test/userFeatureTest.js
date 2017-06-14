process.env.NODE_ENV = 'test';
var server = require('../app');
var http = require('http');
var assert = require('assert');
var Browser = require('zombie');

describe('user signup page', function(){
  before(function(){
    this.server = http.createServer(server).listen(4000)
    this.browser = new Browser({ site: 'http://localhost:4000' });
  });

  beforeEach(function(done){
    this.browser.visit('/users', done);
  })

  it('should show a signup form', function(){
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), 'Sign Up');
    assert.equal(this.browser.text('form label'), 'Name:Email:Password:');
  });

  after(function(done){
    this.server.close(done);
  });
  
});