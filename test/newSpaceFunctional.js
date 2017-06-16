var mongoose = require('mongoose'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var app = require('../app');
var http = require('http');
var Browser = require('zombie');
var Space = require('../models/space')
var User = require('../models/user')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/makersbnb_test');

describe("new space page", function() {

  afterEach(function(done){
    Space.remove({}, function(){
      done();
    });
  });

  before(function(){
    this.server = http.createServer(app).listen(4000, function(){
      console.log("Server listening on 4000");
    });
    this.browser = new Browser({site: 'http://localhost:4000'});
  });

  before(function(done){
    this.browser.visit('/users', done);
  })

  before(function(done) {
    var browser = this.browser;
    browser
      .fill('input[name=name]', 'test_user')
      .fill('input[name=email]', 'webtest@test.com')
      .fill('input[name=password]', 'testx_password')
      .pressButton('Sign Up', done);
  })

  before(function(done){
    this.browser.visit('/spaces/new', done)
  });

  it("should have a name field", function() {
    expect(this.browser.success).to.equal(true);
    expect(this.browser.text('h1')).to.equal('List a new space');
    this.browser.assert.element('form input[name=nameOfSpace]');
  });
  it("should have a submit button", function() {
    this.browser.assert.element('form button[name=submit]');
  });

  describe("Saving to data base", function() {

    var name = 'test3';
    var userID = '82349a8cfdddbce7f22aca5';
    var description = 'also an amazing place';
    var price = 3;

    before(function(done){
      var browser = this.browser;
      browser
        .fill('input[name=nameOfSpace]', name)
        .fill('textarea[name=description]', description)
        .fill('input[name=price]', price)
        .pressButton("submit", done)
    });

    it("should save the space to the database when enters and submits data", function(done) {
      var newUserID;
      User.find({}, function(err, users) {
        newUserID = users[0].id;
        Space.find({}, function(err, spaces) {
          expect(spaces[0].name).to.equal(name);
          expect(spaces[0].userID).to.equal(newUserID);
          done();
        });
      });

    });

    it("redirects the to the /spaces page", function() {
      this.browser.assert.url({pathname: '/spaces'});
    });
  });

  after(function(done) {
    this.server.close(done);
  });
});
