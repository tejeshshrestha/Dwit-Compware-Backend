const mongoose = require("mongoose");

// define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tc: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// create model
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
