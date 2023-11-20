const authRouter = require("./authRouter");
const chatRouter = require("./chatRouter");

const routers = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/message", chatRouter);
};

module.exports = routers;
