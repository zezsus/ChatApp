import React, { useEffect, useState } from "react";
import "../assets/styles/Chat.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRouter } from "../util/APIRouter";
import Contacts from "../components/Contacts";
import Home from "../components/Home";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chatApp")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chatApp")));
    }
  }, []);

  useEffect(() => {
    const Contact = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(
              `${allUsersRouter}/${currentUser._id}`
            );
            setContacts(data.data.users);
          } else {
            navigate("/set-avatar");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    Contact();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat-form">
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />

        {currentChat === undefined ? (
          <Home />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </div>
  );
};

export default Chat;
