const { validationResult } = require("express-validator");
const gallery = require("../models/Gallery");

class galleryController {
  static post = async (req, res) => {
    try {
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

      const Gallery = await new gallery({
        Image: filename,
        ImageName,
        ImageAltText,
      });
      const result = await Gallery.save();
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
      const result = await gallery.find({});
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
