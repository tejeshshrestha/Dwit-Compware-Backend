const { validationResult } = require("express-validator");
const teacher = require("../models/teacherCertificate");

class teacherController {
  static post = (req, res) => {
    const { firstName, lastName, gender } = req.body;
    const Teacher = new teacher({
      firstName,
      lastName,
      gender,
    });
    Teacher.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    teacher
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const { firstName, lastName, gender } = req.body;
    const teacherId = req.params.id;
    teacher
      .findByIdAndUpdate(
        teacherId,
        {
          firstName,
          lastName,
          gender,
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
    teacher
      .deleteOne({ _id: Id })
      .then(() => res.send("Delete Successful!"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = teacherController;
