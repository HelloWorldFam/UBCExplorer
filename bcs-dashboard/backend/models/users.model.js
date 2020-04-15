const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
      firstName: { type: String, required: false, unique: true, trim: true },
      lastName: { type: String, required: false, unique: true, trim: true },
      username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
      password: { type: String, required: true, minlength: 3 },
      email: { type: String, required: true },
      courses: { type: Array, required: false }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;