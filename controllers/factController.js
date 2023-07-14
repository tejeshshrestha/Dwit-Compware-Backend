const Fact = require("../models/Fact");
//import { Fact } from "../models/Fact";

class factController {
  static post = (req, res) => {
    const { totalStudents, ratio, studentsPerClass } = req.body;
    const fact = new Fact({
      totalStudents,
      ratio,
      studentsPerClass,
    });
    fact
      .save()
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static get = (req, res) => {
    Fact.find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const { totalStudents, ratio, studentsPerClass } = req.body;
    const factId = req.params.id;
    Fact.findByIdAndUpdate(
      factId,
      { totalStudents, ratio, studentsPerClass },
      { new: true }
    )
      .then((updatedFact) => {
        if (!updatedFact) {
          return res.status(404).send({ error: "Fact not found" });
        }
        res.send(updatedFact);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static getOneFact = (req, res) => {
    const Id = req.params.id;
    Fact.findOne({ _id: Id })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static delete = (req, res) => {
    const Id = req.params.id;
    Fact.deleteOne({ _id: Id })
      .then((done) => res.send("Deleted Sucessfully"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = factController;
