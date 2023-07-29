const galleryController = require("../controllers/galleryController");
const galleryRouter = require("express").Router();

galleryRouter.get("/", galleryController.get);
galleryRouter.post("/", galleryController.post);
galleryRouter.patch("/:id", galleryController.patch);
galleryRouter.delete("/:id", galleryController.delete);
galleryRouter.get("/:id", galleryController.getOne);

module.exports = galleryRouter;
