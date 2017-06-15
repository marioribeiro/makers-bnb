var mongoose = require('mongoose'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

var app = require('../app');
var http = require('http');
var Browser = require('zombie');
var Space = require('../models/space')

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
    this.browser.visit('/spaces/new', done)
  });

  it("should have a name field", function() {
    expect(this.browser.success).to.equal(true);
    expect(this.browser.text('h1')).to.equal('Name of Space');
    this.browser.assert.element('form input[name=nameOfSpace]');
  });
  it("should have a submit button", function() {
    this.browser.assert.element('form button[name=submit]');
  });

  describe("Saving to data base", function() {

    before(function(done){
      var browser = this.browser;
      browser
        .fill('input[name=nameOfSpace]', 'Big Ben')
        .pressButton("submit", done)
    });

    it("should save the space to the database when enters and submits data", function(done) {
        Space.find({}, function(err, spaces) {
          expect(spaces[0].name).to.equal("Big Ben");
          done();
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
