const Enquiry = require("../models/Enquiry");

class enquiryController {
  static post = (req, res) => {
    const { name, phoneNum, course, enquiryDate, status } = req.body;
    const enquiry = new Enquiry({
      name,
      phoneNum,
      course,
      enquiryDate,
      status,
    });
    enquiry
      .save()
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static get = (req, res) => {
    Enquiry.find({})
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static patch = (req, res) => {
    const { name, phoneNum, course, enquiryDate, status } = req.body;
    const enquiryId = req.params.id;
    Enquiry.findByIdAndUpdate(
      enquiryId,
      { name, phoneNum, course, enquiryDate, status },
      { new: true }
    )
      .then((updatedEnquiry) => {
        if (!updatedEnquiry) {
          return res.status(404).send({ error: "Enquiry not found" });
        }
        res.send(updatedEnquiry);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static getOneEnquiry = (req, res) => {
    const Id = req.params.id;
    Enquiry.findOne({ _id: Id })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send({ error: error.message }));
  };

  static delete = (req, res) => {
    const Id = req.params.id;
    Enquiry.deleteOne({ _id: Id })
      .then(() => res.send("Deleted Sucessfully"))
      .catch((error) => res.status(500).send({ error: error.message }));
  };
}

module.exports = enquiryController;
