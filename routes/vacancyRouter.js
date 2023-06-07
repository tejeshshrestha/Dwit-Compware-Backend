const vacancyController = require("../controllers/vacancyController");
const vacancyRouter = require("express").Router();

vacancyRouter.post("/", vacancyController.post);
vacancyRouter.get("/", vacancyController.get);
vacancyRouter.patch("/:id", vacancyController.patch);
vacancyRouter.delete("/:id", vacancyController.delete);

module.exports = vacancyRouter;
