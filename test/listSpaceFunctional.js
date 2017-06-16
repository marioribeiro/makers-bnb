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

describe("all space page", function() {

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
    var space = new Space({name: 'test2q346t8q', userID: '5943a328cfdddbce7f22aca5'});
    space.save(function(){
      var space2 = new Space({name: 'test3', userID: 'asss43a328cfdddbce7f22aca5'});
      space2.save(done);
    })
  });

  before(function(done){
    this.browser.visit('/spaces', done)
  });

  it("displays the spaces", function(){
    expect(this.browser.text('h1')).to.equal('All Spaces');
    expect(this.browser.text('li:first-child')).to.equal('test2q346t8q');
    expect(this.browser.text('li:nth-child(2)')).to.equal('test3');
  });

  after(function(done) {
    this.server.close(done);
  });

});
