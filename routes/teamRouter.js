const teamRouter = require("express").Router();
const teamController = require("../controllers/teamController");

teamRouter.post("/", teamController.post);
teamRouter.get("/", teamController.get);
teamRouter.patch("/:id", teamController.patch);
teamRouter.delete("/:id", teamController.delete);

module.exports = teamRouter;
