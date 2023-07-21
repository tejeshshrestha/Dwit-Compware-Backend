const teacherController = require("../controllers/requestController");
const teacherRouter = require("express").Router();

teacherRouter.get("/", teacherController.get);
teacherRouter.post("/", teacherController.post);
teacherRouter.patch("/:id", teacherController.patch);
teacherRouter.delete("/:id", teacherController.delete);

module.exports = teacherRouter;
