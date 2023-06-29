const { validationResult } = require("express-validator");
const notifications = require("../models/Notifications");

class notificationController {
  static post = (req, res) => {
    const { footer, link } = req.body;
    const file = req.files.image;

    const timestamp = Date.now();
    const filename = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${filename}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("Upload Successful");
    });

    const Noti = new notifications({
      image: filename,
      footer,
      link,
    });
    Noti.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    notifications
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static patch = (req, res) => {
    const { image, footer, link } = req.body;
    const notificationId = req.params.id;
    if (image) {
      const file = req.files.image;
      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("Upload Successful!");
      });
      image = fileName;
    }
    notifications
      .findByIdAndUpdate(
        notificationId,
        {
          image,
          footer,
          link,
        },
        { new: true }
      )
      .then((updatedNoti) => {
        if (updatedNoti) {
          res.send(updatedNoti);
        }
        return res.status(404).send({ error: "Not Added" });
      })
      .catch((error) => res.status(500).end());
  };

  static getOneNoti = (req, res) => {
    const Id = req.params.id;
    notifications
      .findOne({ _id: Id })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static delete = (req, res) => {
    const Id = req.params.id;
    notifications
      .deleteOne({ _id: Id })
      .then(() => res.send("It's been Deleted!"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = notificationController;
