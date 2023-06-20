const { validationResult } = require("express-validator");
const blog = require("../models/blog");

class blogController {
  static post = (req, res) => {
    const { title, date, author, logo, article } = req.body;
    const file = req.files.image;

    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded");
    });

    const blog = new blog({
      title,
      date,
      author,
      logo,
      article,
    });

    blog
      .save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    blog
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const { title, date, author, logo, article } = req.body;
    const blogId = req.params.id;
    const file = req.files.image;

    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded");
    });
    blog
      .findByIdAndUpdate(
        blogId,
        {
          title,
          date,
          author,
          logo,
          article,
        },
        { new: true }
      )
      .then((updatedBlog) => {
        if (!updatedBlog) {
          return res.status(404).send({ error: "New Blog not found" });
        }
        res.send(updatedBlog);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static getOneBlog = (req, res) => {
    const Id = req.params.id;
    blog
      .findOne({ _id: Id })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static delete = (req, res) => {
    const Id = req.params.id;
    blog
      .deleteOne({ _id: Id })
      .then(() => res.send("Deleted Successfully"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = blogController;
