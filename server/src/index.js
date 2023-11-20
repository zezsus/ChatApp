const express = require("express");
const database = require("./config/connectdb");
const cors = require("cors");
const routers = require("./routers/index");
require("dotenv").config();
const socket = require("socket.io");
const server = require("http").createServer();

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

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
