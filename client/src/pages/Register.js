import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import "../assets/styles/Register.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { registerRouter } from "../util/APIRouter";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = registerForm;

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!confirmPassword) {
      toast.error("Missing username or email or password or confirm password");
    } else {
      if (password !== confirmPassword) {
        toast.error("password and confirm password should be same.");
      } else {
        try {
          const { data } = await axios.post(registerRouter, {
            username,
            email,
            password,
          });
          if (data.success) {
            localStorage.setItem("chatApp", JSON.stringify(data.user));
            navigate("/");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };
  return (
    <div className="form">
      <form onSubmit={handleRegister} className="register-form">
        <div className="brand">
          <img src={logo} alt="logo" />
          <h1>Register</h1>
        </div>

        <div className="input-register">
          <input
            type="text"
            value={username}
            placeholder="Username"
            name="username"
            onChange={handleOnChange}
          />

          <input
            type="email"
            value={email}
            placeholder="Email"
            name="email"
            onChange={handleOnChange}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
          />

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleOnChange}
          />
        </div>

        <div className="button">
          <button type="submit" className="btn-register">
            Create User
          </button>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
