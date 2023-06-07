const mongoose = require("mongoose");
  
const factSchema = mongoose.Schema({
  totalStudents: {
    type: Number,
    required: true,
  },
  ratio: {
    type: String,
    required: true,
  },
  studentsPerClass: {
    type: Number,
    required: true,
  },
});

const Fact = mongoose.model("Fact", factSchema);

module.exports = Fact;
