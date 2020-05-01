const mongoose = require('mongoose');

const { Schema } = mongoose;
const DepartmentsSchema = new Schema({
  dept: String,
  courses: Array
});
const Departments = mongoose.model('dept_codes', DepartmentsSchema);
module.exports = Departments;