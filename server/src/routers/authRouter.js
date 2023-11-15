const authController = require("../controllers/AuthCotroller");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);

module.exports = authRouter;
