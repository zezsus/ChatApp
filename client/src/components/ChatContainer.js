import React, { useEffect, useState } from "react";
import "../assets/styles/ChatContainer.scss";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getMessageRouter, sendMessageRouter } from "../util/APIRouter";

const ChatContainer = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (msg) => {
    try {
      await axios.post(sendMessageRouter, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMessage = async () => {
      const res = await axios.get(getMessageRouter, {
        params: {
          from: currentUser._id,
          to: currentChat._id,
        },
      });

      console.log(res.data.projectMessage);

      setMessages(res.data.projectMessage);
    };
    getMessage();
  }, [currentUser, currentChat]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h4>{currentChat.username}</h4>
          </div>
        </div>
        <Logout />
      </div>

      <div className="chat-message">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}>
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input">
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
