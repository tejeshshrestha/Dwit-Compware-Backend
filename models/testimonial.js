const mongoose = require("mongoose");

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  imageAltText: {
    type: String,
    required: true,
  },
});

const testimonial = mongoose.model("testimonial", testimonialSchema);

module.exports = testimonial;
