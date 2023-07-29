const sessionController = require("../controllers/sessionController");
const sessionRouter = require("express").Router();

sessionRouter.post("/", sessionController.post);
sessionRouter.get("/", sessionController.get);
sessionRouter.patch("/:id", sessionController.patch);
sessionRouter.delete("/:id", sessionController.delete);
sessionRouter.get("/:id", sessionController.getOne);

module.exports = sessionRouter;
