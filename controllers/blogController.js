const { validationResult } = require("express-validator");
const blog = require("../models/blog");

class blogController {
  static post = (req, res) => {
    const { title, date, author, article } = req.body;
    const file = req.files.logo;
    console.log("this", file);
    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("File Uploaded");
    });

    const Blog = new blog({
      title,
      date,
      author,
      logo: fileName,
      article,
    });

    Blog.save()
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

    if (logo) {
      const file = req.files.logo;
      const timestamp = Date.now();
      const fileName = `photo_${timestamp}.jpeg`;

      file.mv(`./storage/${fileName}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("File Uploaded!");
      });
      logo = fileName;
    }
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
        if (updatedBlog) {
          res.send(updatedBlog);
        }
        return res.status(404).send({ error: "No new Vacancies found!" });
      })
      .catch((error) => res.status(500).end());
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
