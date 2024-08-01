import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PageContext } from "../Context/PageContext";
import Credentials from "./Components/Credentials";
import Personal from "./Components/Personal";
import Location from "./Components/Location";
import Security from "./Components/Security";
import { validatePassword } from "../Helper-Functions/validatePassword";
import "./Styling/signup.css";

const SignUp = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setUser } = useContext(PageContext);
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    locationCity: "",
    locationState: "",
    locationZip: "",
    securityQuestion: "",
    securityAnswer: "",
  });
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
  const [formSection, setFormSection] = useState("credentials");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (name === "password") {
      validatePassword(value, setValidationResults);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/users/register`, credentials)
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

  useEffect(() => {
    setPasswordPassed(
      Object.values(validationResults).every((result) => result === true)
    );
  }, [validationResults]);

  return (
    <main className="form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form__section">
          <h2>Sign Up</h2>
        </div>
        {formSection === "credentials" && (
          <Credentials
            credentials={credentials}
            handleInputChange={handleInputChange}
            setError={setError}
            setFormSection={setFormSection}
            validationResults={validationResults}
            passwordPassed={passwordPassed}
          />
        )}
        {formSection === "personal" && (
          <Personal
            credentials={credentials}
            handleInputChange={handleInputChange}
            setError={setError}
            setFormSection={setFormSection}
          />
        )}
        {formSection === "location" && (
          <Location
            credentials={credentials}
            handleInputChange={handleInputChange}
            setFormSection={setFormSection}
          />
        )}
        {formSection === "security" && (
          <>
            <Security
              handleInputChange={handleInputChange}
              credentials={credentials}
            />
            <div className="signup-form__section main-btns">
              <button type="button" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit">Sign Up</button>
            </div>
          </>
        )}
        <div className="signup-form__section switch-btn">
          <button type="button" onClick={() => navigate("/login")}>
            Have an account? Log In
          </button>
        </div>
        <div className="login-form__section error">
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default SignUp;
