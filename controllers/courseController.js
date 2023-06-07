const Course = require("../models/Course");

class courseController {
  static post = (req, res) => {
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

    const file1 = req.files.courseLogo;
    const file2 = req.files.coursePdf;
    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.jpeg`;

    file.mv(`./storage/${fileName}`, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log("Upload Successful!");
    });
    const course = new Course({
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
    course
      .save()
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static get = (req, res) => {
    Course.find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static patch = (req, res) => {
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

    const courseId = req.params;
    Course.findByIdAndUpdate(
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
    )
      .then((updatedCourse) => {
        if (!updatedCourse) {
          return res.status(404).send({ error: "New Course not found" });
        }
        res.send(updatedCourse);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static getOneCourse = (req, res) => {
    const Id = req.params.id;
    Course.findOne({ _id: Id })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static delete = (req, res) => {
    const Id = req.params.id;
    Course.deleteOne({ _id: Id })
      .then((work) => res.send("Deleted Successfully"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = courseController;
