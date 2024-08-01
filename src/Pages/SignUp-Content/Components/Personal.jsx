import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";

const Personal = ({
  credentials,
  handleInputChange,
  setError,
  setFormSection,
}) => {
  return (
    <>
      <div className="signup-form__section">
        <div className="regular-input">
          <MdOutlineDriveFileRenameOutline />
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={credentials.firstName}
            onChange={handleInputChange}
            required
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
      </div>
      <div className="signup-form__section">
        <div className="regular-input">
          <MdOutlineDriveFileRenameOutline />
          <input
            type="text"
            name="middleName"
            id="middleName"
            value={credentials.middleName}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Middle Name (optional)"
          />
        </div>
      </div>
      <div className="signup-form__section">
        <div className="regular-input">
          <MdOutlineDriveFileRenameOutline />
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={credentials.lastName}
            onChange={handleInputChange}
            required
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="signup-form__section">
        <div className="regular-input">
          <BsCalendar2Date />
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={credentials.birthDate}
            onChange={handleInputChange}
            required
            autoComplete="off"
            placeholder="Birth Date"
          />
        </div>
      </div>
      <div className="signup-form__section main-btns">
        <button type="button" onClick={() => setFormSection("credentials")}>
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            const requiredFields = ["firstName", "lastName", "birthDate"];
            if (
              credentials.firstName &&
              credentials.lastName &&
              credentials.birthDate
            ) {
              setFormSection("location");
            } else {
              setError(
                `Please fill in: ${requiredFields
                  .filter((field) => !credentials[field])
                  .map((field) =>
                    field === "firstName"
                      ? "first name"
                      : field === "lastName"
                        ? "last name"
                        : "birth date"
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

export default Personal;
