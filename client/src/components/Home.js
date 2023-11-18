import React, { useEffect, useState } from "react";
import Robot from "../assets/images/robot.gif";
import "../assets/styles/Home.scss";

const Home = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("chatApp")).username);
  }, []);
  return (
    <div className="wellcom">
      <img src={Robot} alt="robot" />
      <h3>
        Wellcome, <span>{username}</span>
      </h3>
      <h4>Please select a chat to Start messaging.</h4>
    </div>
  );
};

export default Home;
