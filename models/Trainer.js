const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema({
  trainerName: {
    type: String,
    required: true,
    unique: true,
  },
  signature: {
    type: [String],
    required: true,
  },
  trainerTitle: {
    type: String,
    required: true,
  },
});

const trainer = mongoose.model("trainer", trainerSchema);

module.exports = trainer;
