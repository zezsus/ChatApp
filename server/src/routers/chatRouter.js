const express = require("express");
const chatController = require("../controllers/ChatController");
const chatRouter = express.Router();

chatRouter.post("/addMsg", chatController.AddMessage);
chatRouter.get("/getMsg", chatController.GetMessage);

module.exports = chatRouter;
