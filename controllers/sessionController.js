const { validationResult } = require("express-validator");
const session = require("../models/session");

class sessionController {
  static post = async (req, res) => {
    try {
      const { course, startDate, courseDuration, start, end } = req.body;
      const Session = new session({
        course,
        startDate,
        courseDuration,
        start,
        end,
      });
      const result = await Session.save();
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
      const result = await session.find({});
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
    const { course, startDate, courseDuration, start, end } = req.body;
    const sessionId = req.params.id;
    try {
      const result = await session.findByIdAndUpdate(
        sessionId,
        {
          course,
          startDate,
          courseDuration,
          start,
          end,
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
      const result = await session.findOne({ _id: Id });
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
      const result = await session.deleteOne({ _id: Id });
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

module.exports = sessionController;
