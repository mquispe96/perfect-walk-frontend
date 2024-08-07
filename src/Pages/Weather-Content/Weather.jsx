import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CurrentWeather from "../Shared-Components/CurrentWeather";
import { PageContext } from "../Context/PageContext";
import "./Styling/weather.css";

const Weather = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { location } = useContext(PageContext);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(
          `${BASE_URL}/weather/byCoords?lat=${location.latitude}&long=${location.longitude}`
        )
        .then((res) => setWeather(res.data));
    }
  }, [location]);

  return (
    <main className="weather-container">
      <section className="weather-container__current">
        <CurrentWeather weather={weather} setWeather={setWeather} />
      </section>
      <section className="weather-container__hourly">
        <h3>Hourly Forecast</h3>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temp</th>
              <th>Feels</th>
              <th>Humidity</th>
              <th>%</th>
              <th>Sky</th>
            </tr>
          </thead>
          <tbody>
            {weather.hourly?.map((hour, index) => (
              <tr key={index}>
                <td>{hour.dateTime}</td>
                <td>{hour.temperature}</td>
                <td>{hour.feelsLike}</td>
                <td>{hour.humidity}</td>
                <td>{hour.pop}</td>
                <td>
                  <img
                    src={`${hour.weather[0].main}.png`}
                    alt={hour.weather[0].description}
                    style={{ width: "30px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="weather-container__daily">
        <h3>Daily Forecast</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Min Temp</th>
              <th>Max Temp</th>
              <th>Humidity</th>
              <th>Wind Speed</th>
              <th>Wind Deg</th>
              <th>UV Index</th>
              <th>Sky</th>
              <th>%</th>
              <th>Rain</th>
              <th>Sunrise</th>
              <th>Sunset</th>
            </tr>
          </thead>
          <tbody>
            {weather.daily?.map((day, index) => (
              <tr key={index}>
                <td>{day.date}</td>
                <td>{day.minTemp}</td>
                <td>{day.maxTemp}</td>
                <td>{day.humidity}</td>
                <td>{day.windSpeed}</td>
                <td>{day.windDeg}</td>
                <td>{day.uvi}</td>
                <td>
                  <img
                    src={`${day.weather[0].main}.png`}
                    alt={day.weather[0].description}
                    style={{ width: "30px" }}
                  />
                </td>
                <td>{day.pop}</td>
                <td>{day.rain}</td>
                <td>{day.sunrise}</td>
                <td>{day.sunset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="weather-container__daily-mobile">
        <h3>Daily Forecast</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Min Temp</th>
              <th>Max Temp</th>
              <th>Humidity</th>
              <th>Sky</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {weather.daily?.map((day, index) => (
              <tr key={index}>
                <td>{day.date}</td>
                <td>{day.minTemp}</td>
                <td>{day.maxTemp}</td>
                <td>{day.humidity}</td>
                <td>
                  <img
                    src={`${day.weather[0].main}.png`}
                    alt={day.weather[0].description}
                    style={{ width: "30px" }}
                  />
                </td>
                <td>{day.pop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Weather;
