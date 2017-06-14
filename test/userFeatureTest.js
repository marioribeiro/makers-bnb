process.env.NODE_ENV = 'test';
var server = require('../app');
var http = require('http');
var assert = require('assert');
var Browser = require('zombie');

describe('user signup page', function(){
  before(function(){
    this.server = http.createServer(server).listen(3000)
    this.browser = new Browser({ site: 'http://localhost:3000/users' });
  });

  it('should show a signup form', function(){
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), 'Sign Up');
    assert.equal(this.browser.text('form label'), 'NameEmailPassword');
  });
  it('should refuse empty submissions');

  after(function(done){
    this.server.close(done);
  });
  
});