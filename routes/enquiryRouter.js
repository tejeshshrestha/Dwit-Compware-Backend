const enquiryController = require("../controllers/enquiryController");
const enquiryRouter = require("express").Router();

enquiryRouter.get("/", enquiryController.get);
enquiryRouter.post("/", enquiryController.post);
enquiryRouter.patch("/:id", enquiryController.patch);
enquiryRouter.delete("/:id", enquiryController.delete);

module.exports = enquiryRouter;
