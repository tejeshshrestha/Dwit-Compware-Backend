const Course = require("../models/Course");

class courseController {
  static post = (req, res) => {
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
