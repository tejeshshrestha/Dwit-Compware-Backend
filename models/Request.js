const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  classSize: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  requestedDate: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
});

const request = mongoose.model("request", requestSchema);

module.exports = request;
