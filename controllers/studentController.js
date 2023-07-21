const { validationResult } = require("express-validator");
const student = require("../models/studentCertificate");

class studentController {
  static post = (req, res) => {
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

    console.log("yo", file);

    const timestamp = Date.now();

    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded!");
    });

    const Student = new student({
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

    Student.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    student
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
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
    student
      .findByIdAndUpdate(
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
      )
      .then((updatedCerti) => {
        if (updatedCerti) {
          res.send(updatedCerti);
        }
        return res.status(404).send({ error: "No new Certificates found!" });
      })
      .catch((error) => res.status(500).end());
  };

  static delete = (req, res) => {
    const Id = req.params.id;
    student
      .deleteOne({ _id: Id })
      .then(() => res.send("Delete Successful!"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = studentController;
