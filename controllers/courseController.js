const Course = require("../models/Course");

class courseController {
  static post = async (req, res) => {
    try {
      const {
        courseName,
        slugTitle,
        courseCategory,
        courseIntro,
        aboutCourse,
        imageName,
        imageAltText,
      } = req.body;

      const file1 = req.files.courseLogo;
      console.log(file1);
      const file2 = req.files.coursePdf;
      console.log(file2);

      //courseLogo is object => Name.md5 + concatenate with Date.now()
      const timestamp = Date.now();

      const courseLogo = file1.md5 + timestamp;
      file1.mv(`./storage/${courseLogo}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("Upload Successful!");
      });

      const coursePdf = file2.md5 + timestamp;
      file2.mv(`./storage/${coursePdf}`, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        console.log("Upload Successful!");
      });

      const course = await new Course({
        courseName,
        slugTitle,
        courseCategory,
        courseIntro,
        aboutCourse,
        courseLogo,
        imageName,
        imageAltText,
        coursePdf,
      });
      const result = await course.save();
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
      const result = await Course.find({});
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
    const {
      courseName,
      slugTitle,
      courseCategory,
      courseIntro,
      aboutCourse,
      courseLogo,
      imageName,
      imageAltText,
      coursePdf,
    } = req.body;

    const courseId = req.params.id;

    if (courseLogo) {
      const file1 = req.files.courselogo;
      const timestamp = Date.now();
      const fileName1 = file1.md5 + timestamp;

      file1.mv(`./storage/${fileName1}`),
        (error) => {
          if (error) {
            return res.status(500).send(error);
          }
          console.log("File Updated!");
        };
      courseLogo = fileName1;
    }

    if (coursePdf) {
      const file2 = req.files.courselogo;
      const timestamp = Date.now();
      const fileName2 = file2.md5 + timestamp;

      file2.mv(`./storage/${fileName2}`),
        (error) => {
          if (error) {
            return res.status(500).send(error);
          }
          console.log("File Updated!");
        };
      coursePdf = fileName2;
    }
    try {
      const result = await Course.findByIdAndUpdate(
        courseId,
        {
          courseName,
          slugTitle,
          courseCategory,
          courseIntro,
          aboutCourse,
          courseLogo,
          imageName,
          imageAltText,
          coursePdf,
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
        msg: "Not updated!",
      });
    }
  };
  static getOne = async (req, res) => {
    const Id = req.params.id;
    try {
      const result = await Course.findOne({ _id: Id });
      res.status(200).json({
        status: true,
        msg: result,
      });
    } catch (err) {
      res.status(404).json({
        status: false,
        msg: "no such ID",
      });
    }
  };
  static delete = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await Course.deleteOne({ _id: Id });
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

module.exports = courseController;
