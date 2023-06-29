const { validationResult } = require("express-validator");
const session = require("../models/session");

class sessionController {
  static post = (req, res) => {
    const { course, startDate, courseDuration, start, end } = req.body;
    const Session = new session({
      course,
      startDate,
      courseDuration,
      start,
      end,
    });
    Session.save()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

  static get = (req, res) => {
    session
      .find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
  static patch = (req, res) => {
    const { course, startDate, courseDuration, start, end } = req.body;
    const sessionId = req.params.id;
    session
      .findByIdAndUpdate(
        sessionId,
        {
          course,
          startDate,
          courseDuration,
          start,
          end,
        },
        { new: true }
      )
      .then((updatedSes) => {
        if (updatedSes) {
          res.send(updatedSes);
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
    session
      .deleteOne({ _id: Id })
      .then(() => res.send("It's been Deleted!"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = sessionController;
