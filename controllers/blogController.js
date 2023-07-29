const { validationResult } = require("express-validator");
const blog = require("../models/blog");

class blogController {
  static post = async (req, res) => {
    try {
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

      const Blog = await new blog({
        title,
        date,
        author,
        logo: fileName,
        article,
      });

      const result = await Blog.save();
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
      const result = await blog.find({});
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err,
      });
    }
  };

  static patch = async (req, res) => {
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
    try {
      const result = await blog.findByIdAndUpdate(
        blogId,
        {
          title,
          date,
          author,
          logo,
          article,
        },
        { new: true }
      );
      if (!result) {
        throw new Error("Not Updated");
      }
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        msg: error,
      });
    }
  };
  static getOne = async (req, res) => {
    const Id = req.params.id;
    try {
      const data = await blog.findOne({ _id: Id });
      if (!data) {
        throw new Error("no data found");
      }
      res.status(200).json({
        status: true,
        msg: data,
      });
    } catch (err) {
      res.status(404).json({
        status: false,
        msg: err,
      });
    }
  };
  static delete = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await blog.deleteOne({ _id: Id });
      console.log(result);
      res.status(200).json({
        status: true,
        msg: "Deletion Successful!",
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        msg: "Id does not exist!",
      });
    }
  };
}
module.exports = blogController;
