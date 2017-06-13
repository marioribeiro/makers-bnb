var mongoose = require('mongoose');
var expect = require('expect.js');
mongoose.connect('mongodb://localhost/makersbnb_test');

describe('Space', function() {

  var Space = require('../models/space');
  var space;

  beforeEach(function() {
    space = new Space();
  });

  it("is a stupid test", function(){
    var testSpace = new Space({ name: "Eiffel-tower"});
    testSpace.save();
    var arr;
    Space.find({}, function(err, spaces) {
      arr = spaces;
      console.log(arr.pop().name);
      expect(arr.pop().name).to.equal("Eiffel-tower");
    });
  });

})
