const { validationResult } = require("express-validator");
const gallery = require("../models/Gallery");

class galleryController {
  static post = (req, res) => {
    const { ImageName, ImageAltText } = req.body;
    const file = req.files.Image;

    const timestamp = Date.now();
    const filename = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${filename}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("Upload Successful");
    });

    const Gallery = new gallery({
      Image: filename,
      ImageName,
      ImageAltText,
    });
    Gallery.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    gallery
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static patch = (req, res) => {
    const { ImageName, ImageAltText, Image } = req.body;
    const notificationId = req.params.id;
    if (Image) {
      const file = req.files.Image;
      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("Upload Successful!");
      });
      Image = fileName;
    }
    gallery
      .findByIdAndUpdate(
        notificationId,
        {
          ImageName,
          ImageAltText,
        },
        { new: true }
      )
      .then((updatedGallery) => {
        if (updatedGallery) {
          res.send(updatedGallery);
        }
        return res.status(404).send({ error: "Not Added" });
      })
      .catch(() => res.status(500).end());
  };

  // static getOneNoti = (req, res) => {
  //   const Id = req.params.id;
  //   notifications
  //     .findOne({ _id: Id })
  //     .then((result) => res.send(result))
  //     .catch((error) => res.status(500).send({ error: error.message }));
  // };

  static delete = (req, res) => {
    const Id = req.params.id;
    gallery
      .deleteOne({ _id: Id })
      .then(() => res.send("It's been Deleted!"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = galleryController;
