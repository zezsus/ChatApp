const express = require("express");
const database = require("./config/connectdb");
const cors = require("cors");
const routers = require("./routers/index");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5500;

//connect db
database.connectDB();

app.use(express.json());
app.use(cors());

routers(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
