const express = require("express");
const database = require("./config/connectdb");
const cors = require("cors");
const routers = require("./routers/index");
require("dotenv").config();
const socket = require("socket.io");
const app = express();

const port = process.env.PORT || 5500;

// Kết nối vào cơ sở dữ liệu
database.connectDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors());

routers(app);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  global.chatSocket = socket;

  global.onlineUsers = new Map();

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    console.log(sendUserSocket);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-get", data.message);
    }
  });
});
