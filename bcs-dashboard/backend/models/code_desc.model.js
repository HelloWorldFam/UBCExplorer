const mongoose = require('mongoose');

const { Schema } = mongoose;
const CourseCodeDescSchema = new Schema({
  code: String,
  desc: String
});
const CourseCodeDesc = mongoose.model('code-desc', CourseCodeDescSchema);
module.exports = CourseCodeDesc;