const Request = require("../models/Request");

class requestController {
  static post = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        course,
        classSize,
        startDate,
        requestedDate,
        level,
        phone,
      } = req.body;
      const request = await new Request({
        firstName,
        lastName,
        email,
        course,
        classSize,
        startDate,
        requestedDate,
        level,
        phone,
      });
      const result = await request.save();
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
      const result = await Request.find({});
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
    try {
      const {
        firstName,
        lastName,
        email,
        course,
        classSize,
        startDate,
        requestedDate,
        level,
        phone,
      } = req.body;
      const requestId = req.params.id;
      const result = await Request.findByIdAndUpdate(
        requestId,
        {
          firstName,
          lastName,
          email,
          course,
          classSize,
          startDate,
          requestedDate,
          level,
          phone,
        },
        { new: true }
      );
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        msg: "Id not found",
      });
    }
  };

  static getOne = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await Request.findOne({ _id: Id });

      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        msg: "No such id",
      });
    }
  };

  static delete = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await Request.deleteOne({ _id: Id });
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

module.exports = requestController;
