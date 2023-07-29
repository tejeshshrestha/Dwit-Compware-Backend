const trainerController = require("../controllers/requestController");
const trainerRouter = require("express").Router();

trainerRouter.get("/", trainerController.get);
trainerRouter.post("/", trainerController.post);
trainerRouter.patch("/:id", trainerController.patch);
trainerRouter.delete("/:id", trainerController.delete);
trainerRouter.get("/:id", trainerController.getOne);

module.exports = trainerRouter;
