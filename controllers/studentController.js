const { validationResult } = require("express-validator");
const student = require("../models/studentCertificate");

class studentController {
  static post = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        course,
        trainer,
        gender,
        courseDuration,
        trainerTitle,
      } = req.body;

      const file = req.files.photo;

      console.log(file);

      const timestamp = Date.now();

      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File Uploaded!");
      });
      const Student = await new student({
        firstName,
        lastName,
        email,
        course,
        trainer,
        gender,
        courseDuration,
        trainerTitle,
        photo: fileName,
      });

      const result = await Student.save();
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
      const data = await student.find({});
      if (!data) {
        throw new Error("no data found");
      }
      res.status(200).json({
        status: true,
        msg: data,
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
      firstName,
      lastName,
      email,
      course,
      trainer,
      gender,
      courseDuration,
      trainerTitle,
      photo,
    } = req.body;
    const studentId = req.params.id;

    if (photo) {
      const file = req.files.companyLogo;
      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File Uploaded!");
      });
      photo = fileName;
    }
    try {
      const result = await student.findByIdAndUpdate(
        studentId,
        {
          firstName,
          lastName,
          email,
          course,
          trainer,
          gender,
          courseDuration,
          trainerTitle,
          photo,
        },
        { new: true }
      );
      if (!result) {
        throw new Error("Not Updated");
      }
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        msg: error,
      });
    }
  };

  static delete = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await student.deleteOne({ _id: Id });
      console.log(result);
      res.status(200).json({
        status: true,
        msg: "Delete Successful!",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error,
      });
    }
  };
}
module.exports = studentController;
