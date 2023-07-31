const teacherController = require("../controllers/teacherController");
const teacherRouter = require("express").Router();

teacherRouter.get("/", teacherController.get);
teacherRouter.post("/", teacherController.post);
teacherRouter.patch("/:id", teacherController.patch);
teacherRouter.delete("/:id", teacherController.delete);
teacherRouter.get("/:id", teacherController.getOne);

module.exports = teacherRouter;
