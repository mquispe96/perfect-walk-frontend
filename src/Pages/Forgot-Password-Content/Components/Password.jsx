import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Validations from "../../Shared-Components/Validations";
import { validatePassword } from "../../Helper-Functions/validatePassword";
import { TbPasswordUser } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Password = ({ email }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (name === "newPassword") {
      setNewPassword(value);
      validatePassword(value, setValidationResults);
    } else {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    axios
      .put(`${BASE_URL}/users/reset-password`, { email, newPassword })
      .then(() => {
        navigate("/login");
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
    <form className="recovery-form" onSubmit={handleSubmit}>
      <div className="recovery-form__section">
        <h2>Account Recovery</h2>
      </div>
      <div className="recovery-form__section">
        <div className="regular-input">
          <TbPasswordUser />
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            value={newPassword}
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
      {!passwordPassed && !newPassword ? (
        ""
      ) : !passwordPassed ? (
        <Validations
          validationResults={validationResults}
          credentials={{ password: newPassword }}
        />
      ) : (
        <div className="recovery-form__section">
          <div className="regular-input">
            <TbPasswordUser />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
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
      <div className="recovery-form__section main-btns">
        <button type="button" onClick={() => navigate("/login")}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
      <div className="recovery-form__section error">
        {error && <p>{error}</p>}
      </div>
    </form>
  );
};

export default Password;
