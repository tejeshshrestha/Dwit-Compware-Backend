const testimonialRouter = require("express").Router();
const testimonialController = require("../controllers/testimonialController");

testimonialRouter.post("/", testimonialController.post);
testimonialRouter.get("/", testimonialController.get);
testimonialRouter.get("/:id", testimonialController.getOneTestimonial);
testimonialRouter.patch("/:id", testimonialController.patch);
testimonialRouter.delete("/:id", testimonialController.delete);

module.exports = testimonialRouter;
