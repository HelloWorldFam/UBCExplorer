const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  picture: String,
  courses: Array,
}).plugin(findOrCreate);

const User = mongoose.model('User', UsersSchema);

module.exports = User;