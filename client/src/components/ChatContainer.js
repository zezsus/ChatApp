import React, { useEffect, useState, useRef } from "react";
import "../assets/styles/ChatContainer.scss";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getMessageRouter, sendMessageRouter } from "../util/APIRouter";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getMessage = async () => {
      const currentUser = JSON.parse(localStorage.getItem("chatApp"));

      const res = await axios.get(getMessageRouter, {
        params: {
          from: currentUser._id,
          to: currentChat._id,
        },
      });

      setMessages(res.data.projectMessage);
    };
    getMessage();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("chatApp"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    const currentUser = JSON.parse(localStorage.getItem("chatApp"));

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    try {
      await axios.post(sendMessageRouter, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
    } catch (error) {
      console.log(error);
    }

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-get", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            <div key={uuidv4()} ref={scrollRef}>
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
