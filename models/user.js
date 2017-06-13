var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var userSchema = new Schema({
    email:    { type: String, required: true, unique: true },
    name:     { type: String, required: true },
    password: { type: String, required: true},
    created_at: Date,
    updated_at: Date
  });

module.exports = mongoose.model('User', userSchema);
