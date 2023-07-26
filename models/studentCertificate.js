const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: [String],
    required: true,
  },
  trainer: {
    type: [String],
    required: true,
  },
  gender: {
    type: [String],
    required: true,
  },
  courseDuration: {
    type: Number,
    required: true,
  },
  trainerTitle: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const student = mongoose.model("studentCertificate", studentSchema);

module.exports = student;
