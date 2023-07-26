const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
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
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  classSize: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
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
