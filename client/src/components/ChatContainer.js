import React from "react";
import "../assets/styles/ChatContainer.scss";
import Logout from "./Logout";

const ChatContainer = ({ currentChat }) => {
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

      <div className="chat-message"></div>
      <div className="chat-input"></div>
    </div>
  );
};

export default ChatContainer;
