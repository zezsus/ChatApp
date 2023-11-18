import React, { useEffect, useState } from "react";
import "../assets/styles/Contacts.scss";
import logo from "../assets/images/logo.svg";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentUserSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const handleChangeCurrentChat = (index, contact) => {
    setCurrentUserSelected(index);
    changeChat(contact);
  };

  return (
    <div className="contacts-file">
      {currentUserImage && currentUserName && (
        <div className="containers">
          <div className="brand">
            <img src={logo} alt="logo" className="logo" />
            <h3>Message</h3>
          </div>
          <div className="contacts">
            {contacts.map((items, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleChangeCurrentChat(index, items)}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${items.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h4>{items.username}</h4>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
