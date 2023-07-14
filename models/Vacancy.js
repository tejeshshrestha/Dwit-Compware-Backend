const mongoose = require("mongoose");

const vacancySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  slugTitle: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  descriptionLink: {
    type: String,
    required: true,
    unique: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  logoImageFileName: {
    type: String,
    required: true,
  },
});

const vacancy = mongoose.model("vacancy", vacancySchema);

module.exports = vacancy;
