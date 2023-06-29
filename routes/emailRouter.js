const emailController = require("../controllers/emailController");
const emailRouter = require("express").Router();

emailRouter.post("/", emailController.post);
// emailRouter.get("/", emailController.get);

module.exports = emailRouter;
