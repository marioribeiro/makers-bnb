var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var SpaceSchema = Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true, maxLength: 300},
    price: {type: Number, required: true},
    userID: {type: String, required: true}
  }
);

SpaceSchema.methods.getUserName = function(){
  console.log("this userID: " + this.userID)
  User.find({id: this.userID}, function(err,user){
    return user.name;
  })
};

module.exports = mongoose.model('Space', SpaceSchema);
