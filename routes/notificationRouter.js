const notificationController = require("../controllers/notificationController");
const notificationRouter = require("express").Router();

notificationRouter.get("/", notificationController.get);
notificationRouter.post("/", notificationController.post);
notificationRouter.patch("/:id", notificationController.patch);
notificationRouter.delete("/:id", notificationController.delete);

module.exports = notificationRouter;
