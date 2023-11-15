const express = require("express");
const authRouter = require("./authRouter");

const routers = (app) => {
  app.use("/api/auth", authRouter);
};

module.exports = routers;
