const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
});

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
