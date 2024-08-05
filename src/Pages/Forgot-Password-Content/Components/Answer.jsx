import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsInfoCircle } from "react-icons/bs";

const Answer = ({ question, email, setFormSection }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/users/check-security-answer`, { email, answer })
      .then(() => {
        setFormSection("password");
      })
      .catch((err) => {
        setError(err.response.data.error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <form className="recovery-form" onSubmit={handleSubmit}>
      <div className="recovery-form__section">
        <h2>Account Recovery</h2>
      </div>
      <div className="recovery-form__section">
        <p>{question}</p>
      </div>
      <div className="recovery-form__section">
        <div className="regular-input">
          <BsInfoCircle />
          <input
            type="text"
            name="answer"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            autoComplete="off"
            placeholder="Answer"
          />
        </div>
      </div>
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

export default Answer;
