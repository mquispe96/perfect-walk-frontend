import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { PageContext } from "../Context/PageContext";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { HiUserCircle } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import "./Styling/login.css";

const LogIn = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setUser } = useContext(PageContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/users/login`, credentials)
      .then((res) => {
        setUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <main className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__section">
          <h2>Log In</h2>
        </div>
        <div className="login-form__section">
          <div className="username">
            <HiUserCircle />
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="login-form__section">
          <div className="password">
            <TbPasswordUser />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Password"
            />
            {showPassword ? (
              <LuEyeOff
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <LuEye
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="login-form__section main-btns">
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit">Log In</button>
        </div>
        <div className="login-form__section">
          <Link className="forgot-link" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <div className="login-form__section switch-btn">
          <button type="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
        <div className="login-form__section error">
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default LogIn;
