const { validationResult } = require("express-validator");
const testimonial = require("../models/Testimonial");

class testimonialController {
  static post = async (req, res) => {
    try {
      const { name, affiliation, description, imageName, imageAltText } =
        req.body;
      const file = req.files.image;

      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File Uploaded");
      });

      const Testimonial = new testimonial({
        name,
        affiliation,
        description,
        image: fileName,
        imageName,
        imageAltText,
      });
      const result = await Testimonial.save();
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
      const result = await testimonial.find({});
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
    const { name, affiliation, description, imageName, imageAltText } =
      req.body;
    const testimonialId = req.params.id;
    const file = req.files.image;

    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded");
    });
    try {
      const result = await testimonial.findByIdAndUpdate(
        testimonialId,
        {
          name,
          affiliation,
          description,
          image: fileName,
          imageName,
          imageAltText,
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
      const result = await testimonial.findOne({ _id: Id });
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
      result = await testimonial.deleteOne({ _id: Id });
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

module.exports = testimonialController;
