const authController = require("../controllers/AuthCotroller");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.post("/setAvatar/:id", authController.SetAvatar);

module.exports = authRouter;
