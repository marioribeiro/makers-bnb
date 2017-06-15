var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  password: { type: String, required: true, maxlength: 500 },
  created_at: Date,
  updated_at: Date
});

userSchema.path('email').validate(function(value, done) {
  this.model('User').count({ email: value }, function(err, count) {
    if (err) {
      return done(err);
    }
    done(!count);
  });
}, 'Email already exists');

module.exports = mongoose.model('User', userSchema);
