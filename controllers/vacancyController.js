const { validationResult } = require("express-validator");
const vacancy = require("../models/Vacancy");

class vacancyController {
  static post = (req, res) => {
    const { companyName, position, description, deadline } = req.body;

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
      description,
      deadline,
      companyLogo: fileName,
    });

    Vacancy.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    vacancy
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const { companyName, position, description, deadline, companyLogo } =
      req.body;
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
    vacancy
      .findByIdAndUpdate(
        vacancyId,
        {
          companyName,
          position,
          description,
          deadline,
          companyLogo,
        },
        { new: true }
      )
      .then((updatedVacancy) => {
        if (updatedVacancy) {
          res.send(updatedVacancy);
        }
        return res.status(404).send({ error: "No new Vacancies found!" });
      })
      .catch((error) => res.status(500).end());
  };

  static delete = (req, res) => {
    const vacancyId = req.params.id;
    vacancy
      .deleteOne({ _id: vacancyId })
      .then(() => res.send("Delete Successful!"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = vacancyController;
