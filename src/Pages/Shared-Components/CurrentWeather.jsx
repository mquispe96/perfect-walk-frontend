import { useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const CurrentWeather = ({weather, setWeather}) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [userInput, setUserInput] = useState("");

  const getWeather = (e) => {
    e.preventDefault();
    axios
      .get(`${BASE_URL}/weather/byInput?input=${userInput}`)
      .then((res) => setWeather(res.data));
    setUserInput("");
  };

  return (
    <div
      className="home-weather-container"
      style={{
        background:
          weather?.current?.weather[0]?.main === "Clear"
            ? "skyblue"
            : "lightgray",
      }}
    >
      <div className="home-weather-container__header">
        <h3>
          {weather?.place?.city ? weather?.place?.city + ", " : ""}{" "}
          {weather?.place?.stateCode} - {weather?.current?.dateTime}
        </h3>
      </div>
      <div className="home-weather-container__main">
        <div className="weather-img">
          <img
            src={`/${weather?.current?.weather[0]?.main}.png`}
            alt="weather icon"
            style={{ width: "100px" }}
          />
          <p>
            {weather?.current?.weather[0]?.description
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>
        <div className="weather-main-info">
          <p>Temp: {weather?.current?.temperature}</p>
          <p>Feels: {weather?.current?.feelsLike}</p>
          <p>Clouds: {weather?.current?.clouds}</p>
          <p>Humidity: {weather?.current?.humidity}</p>
          <p>Dew Point: {weather?.current?.dewPoint}</p>
          <p>Wind Speed: {weather?.current?.windSpeed}</p>
          <p>Visibility: {weather?.current?.visibility}</p>
        </div>
        <div className="weather-rest-info">
          {Number(weather?.current?.rain[0]) !== 0 && (
            <p>Rain: {weather?.current?.rain}</p>
          )}
          {Number(weather?.current?.snow[0]) !== 0 && (
            <p>Snow: {weather?.current?.snow}</p>
          )}
          <p>Sunrise: {weather?.current?.sunrise}</p>
          <p>Sunset: {weather?.current?.sunset}</p>
          <p>Pressure: {weather?.current?.pressure}</p>
          <p>UV Index: {weather?.current?.uvi}</p>
          <p>Wind Degrees: {weather?.current?.windDeg}</p>
        </div>
      </div>
      <div className="home-weather-container__footer">
        <form onSubmit={getWeather}>
          <div className="regular-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter a location"
            />
          </div>
          <div className="switch-btn">
            <button type="submit">
              <CiSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrentWeather;
