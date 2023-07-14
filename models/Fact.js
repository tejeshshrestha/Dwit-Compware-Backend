const mongoose = require("mongoose");

const factSchema = mongoose.Schema({
  totalStudents: {
    type: String,
    required: true,
  },
  ratio: {
    type: String,
    required: true,
  },
  studentsPerClass: {
    type: String,
    required: true,
  },
});

const Fact = mongoose.model("Fact", factSchema);

module.exports = Fact;
