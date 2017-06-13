var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpaceSchema = Schema(
  {
    name: {type: String, required: true}
  }
);

module.exports = mongoose.model('Space', SpaceSchema);
