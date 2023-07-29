const vacancyController = require("../controllers/vacancyController");
const vacancyRouter = require("express").Router();

vacancyRouter.post("/", vacancyController.post);
vacancyRouter.get("/", vacancyController.get);
vacancyRouter.patch("/:id", vacancyController.patch);
vacancyRouter.delete("/:id", vacancyController.delete);
vacancyRouter.get("/:id", vacancyController.getOne);

module.exports = vacancyRouter;
