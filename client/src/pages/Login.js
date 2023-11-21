import React, { useEffect, useState } from "react";
import "../assets/styles/Login.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { loginRouter } from "../util/APIRouter";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("chatApp")) {
      return navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(loginRouter, {
        username,
        password,
      });
      if (data.success) {
        localStorage.setItem("chatApp", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="form">
      <form onSubmit={handleLogin} className="login-form">
        <div className="brand">
          <img src={logo} alt="logo" />
          <h1>Login</h1>
        </div>

        <div className="input-login">
          <input
            type="text"
            value={username}
            placeholder="Username"
            name="username"
            onChange={handleOnChange}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
          />
        </div>

        <div className="button">
          <button type="submit" className="btn-login">
            Login
          </button>
          <span>
            Already have an account?&nbsp;
            <Link to="/register" className="link">
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
