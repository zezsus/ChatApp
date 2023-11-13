const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log("App listen on port", port);
});
