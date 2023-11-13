const express = require("express");
const database = require("./config/connectdb");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5500;

//connect db
database.connectDB();

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
