//const express = require("express");
const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  slugTitle: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: String,
    required: true,
  },
  courseIntro: {
    type: String,
    required: true,
  },
  aboutCourse: {
    type: String,
    required: true,
  },
  courseLogo: {
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
  coursePdf: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
