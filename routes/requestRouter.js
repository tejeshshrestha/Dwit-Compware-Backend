const requestController = require("../controllers/requestController");
const requestRouter = require("express").Router();

requestRouter.get("/", requestController.get);
requestRouter.post("/", requestController.post);
requestRouter.patch("/:id", requestController.patch);
requestRouter.delete("/:id", requestController.delete);

module.exports = requestRouter;
