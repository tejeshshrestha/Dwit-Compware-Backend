const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Post: {
    type: [String],
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  ImageName: {
    type: String,
    required: true,
    unique: true,
  },
  ImageAltText: {
    type: String,
    required: true,
  },
});

const team = mongoose.model("teams", teamSchema);
module.exports = team;
