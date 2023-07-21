const { validationResult } = require("express-validator");
const trainer = require("../models/Trainer");

class trainerController {
  static post = (req, res) => {
    const { trainerName, trainerTitle } = req.body;

    const file = req.files.signature;

    console.log("yo", file);

    const timestamp = Date.now();

    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded!");
    });

    const Trainer = new trainer({
      trainerName,
      signature: fileName,
      trainerTitle,
    });

    Trainer.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    trainer
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const { trainerName, signature, trainerTitle } = req.body;
    const trainerId = req.params.id;

    if (signature) {
      const file = req.files.signature;
      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File Uploaded!");
      });
      signature = fileName;
    }
    trainer
      .findByIdAndUpdate(
        trainerId,
        {
          trainerName,
          signature,
          trainerTitle,
        },
        { new: true }
      )
      .then((updated) => {
        if (updated) {
          res.send(updated);
        }
        return res.status(404).send({ error: "No new trainer found!" });
      })
      .catch((error) => res.status(500).end());
  };

  static delete = (req, res) => {
    const Id = req.params.id;
    trainer
      .deleteOne({ _id: Id })
      .then(() => res.send("Delete Successful!"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = trainerController;
