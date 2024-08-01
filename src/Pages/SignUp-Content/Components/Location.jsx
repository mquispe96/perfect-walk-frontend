import SelectStateOpts from "../../Shared-Components/SelectStateOpts";
import { GrLocationPin } from "react-icons/gr";

const Location = ({ credentials, handleInputChange, setFormSection }) => {
  return (
    <>
      <div className="signup-form__section">
        <div className="regular-input">
          <GrLocationPin />
          <input
            type="text"
            name="locationCity"
            id="locationCity"
            value={credentials.locationCity}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="City (optional)"
          />
        </div>
      </div>
      <div className="signup-form__section">
        <div className="regular-input">
          <GrLocationPin />
          <select
            name="locationState"
            id="locationState"
            onChange={handleInputChange}
          >
            <SelectStateOpts />
          </select>
        </div>
      </div>
      <div className="signup-form__section">
        <div className="regular-input">
          <GrLocationPin />
          <input
            type="text"
            name="locationZip"
            id="locationZip"
            value={credentials.locationZip}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Zip Code (optional)"
          />
        </div>
      </div>
      <div className="signup-form__section main-btns">
        <button type="button" onClick={() => setFormSection("personal")}>
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            setFormSection("security");
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Location;
