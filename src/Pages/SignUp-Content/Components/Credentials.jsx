import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Validations from "../../Shared-Components/Validations";

const Credentials = ({
  credentials,
  handleInputChange,
  setError,
  setFormSection,
  validationResults,
  passwordPassed,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="signup-form__section">
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
      <div className="signup-form__section">
        <div className="regular-input">
          <HiUserCircle />
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
            autoComplete="off"
            placeholder="Username"
          />
        </div>
      </div>
      <div className="signup-form__section">
        <div className="password">
          <TbPasswordUser />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
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
      {!passwordPassed && !credentials.password ? (
        ""
      ) : !passwordPassed ? (
        <Validations
          validationResults={validationResults}
          credentials={credentials}
        />
      ) : (
        <div className="signup-form__section">
          <div className="password">
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
      )}
      <div className="signup-form__sectioni main-btns">
        <button
          type="button"
          onClick={() => {
            const requiredFields = [
              "email",
              "username",
              "password",
              "confirmPassword",
            ];
            if (
              credentials.email &&
              credentials.username &&
              credentials.password &&
              credentials.confirmPassword
            ) {
              if (credentials.password !== credentials.confirmPassword) {
                setError("Passwords do not match");
                setTimeout(() => {
                  setError("");
                }, 3000);
              } else {
                setFormSection("personal");
              }
            } else {
              setError(
                `Please fill in: ${requiredFields
                  .filter((field) => !credentials[field])
                  .map((field) =>
                    field === "confirmPassword" ? "confirm password" : field
                  )
                  .join(", ")} `
              );
              setTimeout(() => {
                setError("");
              }, 3000);
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Credentials;
