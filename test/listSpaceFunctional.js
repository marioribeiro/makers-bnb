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

  var name1 = 'test1';
  var userID1 = '5943a328cfdddbce7f22aca5';
  var description1 = 'the most amazing place in the whole wide world';
  var price1 = 1;
  var name2 = 'test2';
  var userID2 = '34853hfcfdddbce7f22aca5';
  var description2 = 'the second most amazing place in the whole wide world';
  var price2 = 2;

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
    var space = new Space({name: name1, userID: userID1, description: description1, price: price1});
    space.save(function(){
      var space2 = new Space({name: name2, userID: userID2, description: description2, price: price2});
      space2.save(done);
    })
  });

  before(function(done){
    this.browser.visit('/spaces', done)
  });

  it("displays the spaces", function(){
    expect(this.browser.text('h1')).to.equal('All Spaces');
    expect(this.browser.text('li:first-child')).to.equal(name1);
    expect(this.browser.text('li:nth-child(2)')).to.equal(name2);
  });

  after(function(done) {
    this.server.close(done);
  });

});
