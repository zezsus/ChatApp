const Message = require("../models/ChatModel");

const AddMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Message added successfully.",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Failed to add message to the database",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const GetMessage = async (req, res) => {
  const { from, to } = req.query;

  try {
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updateAt: 1 });

    const projectMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.status(200).json({
      success: true,
      projectMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { AddMessage, GetMessage };
