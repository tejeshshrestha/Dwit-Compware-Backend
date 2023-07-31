const { validationResult } = require("express-validator");
const teacher = require("../models/teacherCertificate");

class teacherController {
  static post = async (req, res) => {
    try {
      const { firstName, lastName, gender } = req.body;
      const Teacher = new teacher({
        firstName,
        lastName,
        gender,
      });
      const result = await Teacher.save();
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err,
      });
    }
  };

  static get = async (req, res) => {
    try {
      const result = await teacher.find({});
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err,
      });
    }
  };
  static patch = async (req, res) => {
    const { firstName, lastName, gender } = req.body;
    const teacherId = req.params.id;
    try {
      const result = await teacher.findByIdAndUpdate(
        teacherId,
        {
          firstName,
          lastName,
          gender,
        },
        { new: true }
      );
      if (!result) {
        throw Error;
      }
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (err) {
      res.status(404).json({
        status: false,
        msg: "Check Id again",
      });
    }
  };

  static getOne = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await teacher.findOne({ _id: Id });
      if (!result) {
        throw Error;
      }
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (err) {
      res.status(404).json({
        status: false,
        msg: "Invalid ID",
      });
    }
  };

  static delete = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await teacher.deleteOne({ _id: Id });
      console.log(result);
      res.status(200).json({
        status: true,
        msg: "Deletion Successful!",
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        msg: "Id does not exist!",
      });
    }
  };
}

module.exports = teacherController;
