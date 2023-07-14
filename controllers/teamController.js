const { validationResult } = require("express-validator");
const team = require("../models/Team");

class teamController {
  static post = (req, res) => {
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

    const Team = new team({
      Name,
      Email,
      Post,
      Description,
      ImageAltText,
      ImageName,
      Image: filename,
    });
    Team.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };
  static get = (req, res) => {
    team
      .find({})
      .then((result) => res.send(result))
      .catch((result) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
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
    team
      .findByIdAndUpdate(
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
      )
      .then((updatedTeam) => {
        if (!updatedTeam) {
          return res.status(404).send({ error: "Team not added" });
        }
        res.send(updatedTeam);
      })
      .catch(() => res.status(500).end());
  };

  static delete = (req, res) => {
    const Id = req.params.id;
    team
      .deleteOne({ _id: Id })
      .then(() => res.send("Deleted Successfully"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = teamController;
