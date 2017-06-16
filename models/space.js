var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpaceSchema = Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true, maxLength: 300},
    price: {type: Number, required: true},
    userID: {type: String, required: true}
  }
);

module.exports = mongoose.model('Space', SpaceSchema);
