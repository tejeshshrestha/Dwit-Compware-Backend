const blogController = require("../controllers/blogController");
const blog = require("../models/Blog");
const blogRouter = require("express").Router();

blogRouter.get("/", blogController.get);
blogRouter.post("/", blogController.post);
blogRouter.patch("/:id", blogController.patch);
blogRouter.delete("/:id", blogController.delete);

module.exports = blogRouter;
