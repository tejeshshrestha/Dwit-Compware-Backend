const { validationResult } = require("express-validator");
const team = require("../models/Team");

class teamController {
  static post = async (req, res) => {
    try {
      const { Name, Email, Post, Description, ImageName, ImageAltText } =
        req.body;
      const file = req.files.Image;

      const timestamp = Date.now();
      const filename = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${filename}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File upload successful!");
      });

      const Team = await new team({
        Name,
        Email,
        Post,
        Description,
        ImageAltText,
        ImageName,
        Image: filename,
      });
      const result = await Team.save();
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error,
      });
    }
  };
  static get = async (req, res) => {
    try {
      const result = await team.find({});
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error,
      });
    }
  };

  static patch = async (req, res) => {
    const { Name, Email, Post, Description, ImageName, Image, ImageAltText } =
      req.body;
    const teamId = req.params.id;
    if (Image) {
      const file = req.files.Image;

      const timestamp = Date.now();
      const filename = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${filename}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File upload successful!");
      });
      Image = filename;
    }
    try {
      const result = await team.findByIdAndUpdate(
        teamId,
        {
          Name,
          Email,
          Post,
          Description,
          ImageName,
          ImageAltText,
        },
        { new: true }
      );
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error,
      });
    }
  };

  static getOne = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await team.findOne({ _id: Id });
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
      const result = await team.deleteOne({ _id: Id });
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

module.exports = teamController;
