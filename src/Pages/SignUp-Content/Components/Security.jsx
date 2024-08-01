import { BsInfoCircle } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";

const Security = ({ handleInputChange, credentials }) => {
  return (
    <>
      <div className="signup-form__section">
        <div className="regular-input">
          <FaRegQuestionCircle />
          <select
            name="securityQuestion"
            id="securityQuestion"
            onChange={handleInputChange}
            required
          >
            <option value="">Security Question</option>
            <option value="What is your favorite color?">
              What is your favorite color?
            </option>
            <option value="What is your favorite food?">
              What is your favorite food?
            </option>
            <option value="What is your favorite movie?">
              What is your favorite movie?
            </option>
            <option value="What is your favorite song?">
              What is your favorite song?
            </option>
            <option value="What is your favorite TV show?">
              What is your favorite TV show?
            </option>
            <option value="What is your mother's maiden name?">
              What is your mother's maiden name?
            </option>
            <option value="What is your pet's name?">
              What is your pet's name?
            </option>
            <option value="What is your favorite book?">
              What is your favorite book?
            </option>
            <option value="What is your favorite sport?">
              What is your favorite sport?
            </option>
            <option value="What is your favorite hobby?">
              What is your favorite hobby?
            </option>
          </select>
        </div>
      </div>
      <div className="signup-form__section">
        <div className="regular-input">
          <BsInfoCircle />
          <input
            type="text"
            name="securityAnswer"
            id="securityAnswer"
            value={credentials.securityAnswer}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Security Answer"
            required
          />
        </div>
      </div>
    </>
  );
};

export default Security;
