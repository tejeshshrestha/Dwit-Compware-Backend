const Request = require("../models/Request");

class requestController {
  static post = (req, res) => {
    const {
      firstName,
      lastName,
      email,
      course,
      classSize,
      startDate,
      requestDate,
      level,
      phone,
    } = req.body;
    const request = new Request({
      firstName,
      lastName,
      email,
      course,
      classSize,
      startDate,
      requestDate,
      level,
      phone,
    });
    request
      .save()
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static get = (req, res) => {
    Request.find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const {
      firstName,
      lastName,
      email,
      course,
      classSize,
      startDate,
      requestDate,
      level,
      phone,
    } = req.body;
    const requestId = req.params.id;
    Request.findByIdAndUpdate(
      requestId,
      {
        firstName,
        lastName,
        email,
        course,
        classSize,
        startDate,
        requestDate,
        level,
        phone,
      },
      { new: true }
    )
      .then((updatedRequest) => {
        if (!updatedRequest) {
          return res.status(404).send({ error: "Request not found" });
        }
        res.send(updatedRequest);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static getOneRequest = (req, res) => {
    const Id = req.params.id;
    Request.findOne({ _id: Id })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static delete = (req, res) => {
    const Id = req.params.id;
    Request.deleteOne({ _id: Id })
      .then(() => res.send("Deleted Sucessfully"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = requestController;
