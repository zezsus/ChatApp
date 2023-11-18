import React, { useEffect, useState } from "react";
import "../assets/styles/SetAvata.scss";
import { setAvatarRouter } from "../util/APIRouter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import Loading from "./Loading";

const SetAvatar = () => {
  const apiAvata = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatars, setSelectedAvatars] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chatApp")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const setImage = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${apiAvata}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.log(error);
        }
      }
      setAvatars(data);
      setIsLoading(false);
    };
    setImage();
  }, []);

  const handleSetProfilePictrue = async (e) => {
    e.preventDefault();
    if (selectedAvatars === undefined) {
      return toast.error("Please select an avata.");
    } else {
      try {
        const user = await JSON.parse(localStorage.getItem("chatApp"));

        const dataImage = await axios.post(`${setAvatarRouter}/${user._id}`, {
          image: avatars[selectedAvatars],
        });

        if (dataImage.data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = dataImage.data.image;
          localStorage.setItem("chatApp", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="set-avatar">
          <Loading />
        </div>
      ) : (
        <div className="set-avatar">
          <div className="title">
            <h1>Pick an avata as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((items, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatars === index ? "selected" : ""
                  }`}>
                  <img
                    src={`data:image/svg+xml;base64,${items}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatars(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="button">
            <button className="btn-submit" onClick={handleSetProfilePictrue}>
              Set as Profile Picture
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SetAvatar;
