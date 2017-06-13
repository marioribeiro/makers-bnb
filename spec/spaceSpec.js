describe("Space", function() {

  var space;

  beforeEach(function(){
    space = new Space();
  });

  it("is expected to be created with an ID", function() {
    expect(space._id).toEqual(1);
  });

});
