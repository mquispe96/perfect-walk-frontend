import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validatePassword } from "../Helper-Functions/validatePassword";
import Validations from "../Shared-Components/Validations";
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { LuEye, LuEyeOff } from "react-icons/lu";
import './Styling/change.css';

const ChangePassword = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationResults, setValidationResults] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    noRepeat: true,
  });
  const [passwordPassed, setPasswordPassed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (name === "newPassword") {
      validatePassword(value, setValidationResults);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.newPassword !== credentials.confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    axios
      .put(`${BASE_URL}/users/change-password`, credentials)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  useEffect(() => {
    setPasswordPassed(
      Object.values(validationResults).every((result) => result === true)
    );
  }, [validationResults]);

  return (
    <main className="form-container">
      <form className="change-form" onSubmit={handleSubmit}>
        <div className="change-form__section">
          <h2>Change Password</h2>
        </div>
        <div className="change-form__section">
          <div className="regular-input">
            <MdAlternateEmail />
            <input
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              autoComplete="off"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="change-form__section">
          <div className="regular-input">
            <TbPasswordUser />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              autoComplete="off"
              placeholder="Current Password"
            />
            {showPassword ? (
              <LuEyeOff
                onClick={() => setShowPassword(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <LuEye
                onClick={() => setShowPassword(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        <div className="change-form__section">
          <div className="regular-input">
            <TbPasswordUser />
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={credentials.newPassword}
              onChange={handleInputChange}
              required
              autoComplete="off"
              placeholder="New Password"
            />
            {showPassword ? (
              <LuEyeOff
                onClick={() => setShowPassword(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <LuEye
                onClick={() => setShowPassword(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        {!passwordPassed && !credentials.newPassword ? (
          ""
        ) : !passwordPassed ? (
          <Validations
            validationResults={validationResults}
            credentials={credentials}
          />
        ) : (
          <div className="change-form__section">
            <div className="regular-input">
              <TbPasswordUser />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
                required
                autoComplete="off"
                placeholder="Confirm Password"
              />
              {showPassword ? (
                <LuEyeOff
                  onClick={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <LuEye
                  onClick={() => setShowPassword(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
        )}
        <div className="change-form__section main-btns">
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit">Change</button>
        </div>
        <div className="change-form__section error">
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default ChangePassword;
