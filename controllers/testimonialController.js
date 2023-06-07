const { validationResult } = require("express-validator");
const testimonial = require("../models/testimonial");

class testimonialController {
  static post = (req, res) => {
    const { name, affiliation, description, imageName, imageAltText } =
      req.body;
    const file = req.files.image;

    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded");
    });

    const Testimonial = new testimonial({
      name,
      affiliation,
      description,
      image: fileName,
      imageName,
      imageAltText,
    });

    Testimonial.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    testimonial
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const { name, affiliation, description, imageName, imageAltText } =
      req.body;
    const testimonialId = req.params.id;
    const file = req.files.image;

    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded");
    });
    testimonial
      .findByIdAndUpdate(
        testimonialId,
        {
          name,
          affiliation,
          description,
          image: fileName,
          imageName,
          imageAltText,
        },
        { new: true }
      )
      .then((updatedTestimonial) => {
        if (!updatedTestimonial) {
          return res.status(404).send({ error: "New Testimonial not found" });
        }
        res.send(updatedTestimonial);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static getOneTestimonial = (req, res) => {
    const Id = req.params.id;
    testimonial
      .findOne({ _id: Id })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static delete = (req, res) => {
    const Id = req.params.id;
    testimonial
      .deleteOne({ _id: Id })
      .then(() => res.send("Deleted Successfully"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = testimonialController;
