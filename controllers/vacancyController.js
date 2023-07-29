const { validationResult } = require("express-validator");
const vacancy = require("../models/Vacancy");

class vacancyController {
  static post = async (req, res) => {
    try {
      const {
        companyName,
        slugTitle,
        position,
        description,
        deadline,
        logoImageFileName,
        descriptionLink,
      } = req.body;

      const file = req.files.companyLogo;

      console.log("yo", file);

      const timestamp = Date.now();

      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File Uploaded!");
      });

      const Vacancy = new vacancy({
        companyName,
        position,
        slugTitle,
        description,
        deadline,
        companyLogo: fileName,
        logoImageFileName,
        descriptionLink,
      });

      const result = await Vacancy.save();
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
      const result = await vacancy.find({});
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
    const {
      companyName,
      position,
      slugTitle,
      description,
      deadline,
      companyLogo,
      logoImageFileName,
      descriptionLink,
    } = req.body;
    const vacancyId = req.params.id;

    if (companyLogo) {
      const file = req.files.companyLogo;
      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File Uploaded!");
      });
      companyLogo = fileName;
    }
    try {
      const result = await vacancy.findByIdAndUpdate(
        vacancyId,
        {
          companyName,
          position,
          slugTitle,
          description,
          deadline,
          companyLogo,
          logoImageFileName,
          descriptionLink,
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
      const result = await vacancy.findOne({ _id: Id });
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
      const vacancyId = req.params.id;
      result = await vacancy.deleteOne({ _id: vacancyId });
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

module.exports = vacancyController;
