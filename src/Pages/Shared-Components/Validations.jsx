const Validations = ({validationResults, credentials}) => {
  return (
    <ul className="validations">
      <li style={{ color: validationResults.length ? "green" : "red" }}>
        At least 12 characters
      </li>
      <li style={{ color: validationResults.lowercase ? "green" : "red" }}>
        At least one lowercase letter
      </li>
      <li style={{ color: validationResults.uppercase ? "green" : "red" }}>
        At least one uppercase letter
      </li>
      <li style={{ color: validationResults.number ? "green" : "red" }}>
        At least one number
      </li>
      <li style={{ color: validationResults.specialChar ? "green" : "red" }}>
        At least one special character
      </li>
      <li
        style={{
          color:
            validationResults.noRepeat && credentials.password
              ? "green"
              : "red",
        }}
      >
        No repeating characters in a row
      </li>
    </ul>
  );
};

export default Validations;
