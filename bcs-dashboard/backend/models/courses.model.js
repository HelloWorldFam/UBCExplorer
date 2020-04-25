const mongoose = require('mongoose');

const { Schema } = mongoose;
const CoursesSchema = new Schema({
  dept: String,
  code: String,
  cred: Number,
  desc: String,
  prer: String,
  preq: Array,
  crer: String,
  creq: Array
});
const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;