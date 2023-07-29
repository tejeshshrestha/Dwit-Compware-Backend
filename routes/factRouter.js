const factRouter = require("express").Router();
const factController = require("../controllers/factController");

factRouter.post("/", factController.post);
factRouter.get("/", factController.get);

factRouter.get("/:id", factController.getOne);
factRouter.patch("/:id", factController.patch);
factRouter.delete("/:id", factController.delete);

//factRouter.put("/:id", factController.patch);

module.exports = factRouter;
