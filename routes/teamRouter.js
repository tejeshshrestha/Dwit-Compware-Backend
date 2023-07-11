const teamRouter = require("express").Router();
const teamController = require("../controllers/teamController");

teamRouter.post("/", teamController.post);
teamRouter.get("/", teamController.get);
teamRouter.patch("/", teamController.patch);
teamRouter.delete("/", teamController.delete);

module.exports = teamRouter;
