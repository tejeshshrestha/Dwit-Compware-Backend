const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  course: {
    type: [String],
    required: true,
    unique: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const session = mongoose.model("session", sessionSchema);

module.exports = session;
