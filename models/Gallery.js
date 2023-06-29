const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  Image: {
    type: String,
    required: true,
  },
  ImageName: {
    type: String,
    required: true,
  },
  ImageAltText: {
    type: String,
    required: true,
  },
});

const gallery = mongoose.model("gallery", gallerySchema);

module.exports = gallery;
