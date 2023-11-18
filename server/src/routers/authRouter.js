const authController = require("../controllers/AuthCotroller");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.post("/setAvatar/:id", authController.SetAvatar);
authRouter.get("/allUsers/:id", authController.AllUsers);
authRouter.post("/logout", authController.Logout);

module.exports = authRouter;
