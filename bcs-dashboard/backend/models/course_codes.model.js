const mongoose = require('mongoose');

const { Schema } = mongoose;
const CourseCodesSchema = new Schema({
  name: String
});
const CourseCodes = mongoose.model('course_codes', CourseCodesSchema);
module.exports = CourseCodes;