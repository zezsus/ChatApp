import React, { useState } from "react";
import "../assets/styles/ChatInput.scss";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";

const ChatInput = ({ handleSendMessage }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
      setShowEmoji(false);
    }
  };

  const handleEnter = (keycode) => {
    if (keycode === "13") {
      handleSend();
    }
  };

  return (
    <div className="chatInput">
      <div className="button-container">
        <div className="emoji">
          <MdEmojiEmotions size={25} onClick={() => setShowEmoji(!showEmoji)} />
          {showEmoji && (
            <EmojiPicker
              onEmojiClick={(emojiObject) =>
                setMsg((prevMsg) => prevMsg + emojiObject.emoji)
              }
              height={350}
            />
          )}
        </div>
      </div>

      <form className="input-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Enter your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" onKeyPress={handleEnter}>
          <IoMdSend size={30} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
