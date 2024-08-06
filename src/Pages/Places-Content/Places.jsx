import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SelectStateOpts from "../Shared-Components/SelectStateOpts";
import Place from "./Components/Place";
import { PageContext } from "../Context/PageContext";
import "./Styling/places.css";

const Places = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { location } = useContext(PageContext);
  const [places, setPlaces] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
    if (state) {
      axios
        .get(`${BASE_URL}/locations/byState?stateCode=${state}`)
        .then((res) => setPlaces(res.data));
    }
  }, [state]);

  useEffect(() => {
    if (location.place) {
      setState(location.place);
    }
  }, [location]);

  return (
    <main className="places-container">
      <section className="places-container__header">
        <h2>Places</h2>
        <div className="select-state">
          <label htmlFor="state">Select a State:</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <SelectStateOpts />
          </select>
        </div>
      </section>
      <section className="places-container__grid">
        {places.map((place) => <Place key={place.id} place={place} />)}
      </section>
    </main>
  );
};

export default Places;
