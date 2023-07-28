const Fact = require("../models/Fact");

class factController {
  static post = async (req, res) => {
    try {
      const { totalStudents, ratio, studentsPerClass } = req.body;
      const fact = new Fact({
        totalStudents,
        ratio,
        studentsPerClass,
      });
      const result = await fact.save();
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
      const result = Fact.find({});
      if (!result) {
        throw new Error("No data");
      }
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

  static patch = async (req, res) => {
    try {
      const { totalStudents, ratio, studentsPerClass } = req.body;
      const factId = req.params.id;
      const result = await Fact.findByIdAndUpdate(
        factId,
        { totalStudents, ratio, studentsPerClass },
        { new: true }
      );
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
  static getOneFact = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await Fact.findOne({ _id: Id });
      if (!result) {
        throw new Error("No data");
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

  static delete = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await Fact.deleteOne({ _id: Id });
      console.log(result);
      res.status(200).json({
        status: true,
        msg: "Deleted!",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error,
      });
    }
  };
}

module.exports = factController;
