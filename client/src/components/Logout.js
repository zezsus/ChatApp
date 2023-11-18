import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="pe-2">
      <button className="btn btn-danger" onClick={handleLogout}>
        <IoIosLogOut size={25} />
      </button>
    </div>
  );
};

export default Logout;
