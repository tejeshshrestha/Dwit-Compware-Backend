const mongoose = require("mongoose");

const enquirySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  enquiryDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["done", "not done"],
  },
});

const enquiry = mongoose.model("enquiry", enquirySchema);

module.exports = enquiry;
