const studentController = require("../controllers/requestController");
const studentRouter = require("express").Router();

studentRouter.get("/", studentController.get);
studentRouter.post("/", studentController.post);
studentRouter.patch("/:id", studentController.patch);
studentRouter.delete("/:id", studentController.delete);

module.exports = studentRouter;
