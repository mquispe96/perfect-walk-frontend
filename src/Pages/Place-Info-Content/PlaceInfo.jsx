import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CurrentWeather from "../Shared-Components/CurrentWeather";
import "./Styling/place.css";

const PlaceInfo = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { parkCode } = useParams();
  const [place, setPlace] = useState({});
  const [weather, setWeather] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        if (prev === place?.images.length - 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [place?.images]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/locations/byParkCode?parkCode=${parkCode}`)
      .then((res) => setPlace(res.data));
  }, []);

  useEffect(() => {
    if (place?.latitude && place?.longitude) {
      axios
        .get(
          `${BASE_URL}/weather/byCoords?lat=${place.latitude}&long=${place.longitude}`
        )
        .then((res) => setWeather(res.data));
    }
  }, [place]);

  return (
    <main className="place-info-container">
      <section className="place-info-container__name">
        <h2>{place?.fullName}</h2>
      </section>
      <section className="place-info-container__images">
        {place?.images?.length === 2 ? (
          <>
            <div className="image-container">
              <img
                src={place?.images[0]?.url}
                alt={place?.images[0]?.altText}
              />
              <p className="image-container__cap">
                {place?.images[0]?.caption}
              </p>
            </div>
            <div className="image-container">
              <img
                src={place?.images[1]?.url}
                alt={place?.images[1]?.altText}
              />
              <p className="image-container__cap">
                {place?.images[1]?.caption}
              </p>
            </div>
          </>
        ) : place?.images?.length === 1 ? (
          <div className="image-container">
            <img src={place?.images[0]?.url} alt={place?.images[0]?.altText} />
            <p className="image-container__cap">{place?.images[0]?.caption}</p>
          </div>
        ) : place?.images ? (
          <>
            <div className="image-container">
              <img
                src={place?.images[imageIndex]?.url}
                alt={place?.images[imageIndex]?.altText}
              />
              <p className="image-container__cap">
                {place?.images[imageIndex]?.caption}
              </p>
            </div>
            <div className="image-container">
              <img
                src={place?.images[imageIndex + 1]?.url}
                alt={place?.images[imageIndex + 1]?.altText}
              />
              <p className="image-container__cap">
                {place?.images[imageIndex + 1]?.caption}
              </p>
            </div>
          </>
        ) : (
          ""
        )}
      </section>
      <section className="place-info-container__description">
        <h4>{place?.description}</h4>
      </section>
      <section className="place-info-container__activities">
        <h5>Activities</h5>
        <ul>
          {place?.activities ? (
            <>
              {place?.activities.map((activity) => (
                <li key={activity.id}>{activity.name}</li>
              ))}
            </>
          ) : (
            ""
          )}
        </ul>
      </section>
      <section className="place-info-container__addresses-contacts">
        <div className="addresses">
          <h5>Addresses</h5>
          {place?.addresses ? (
            <div className="ea-address">
              {place?.addresses.map((address) => (
                <div key={address.type} className="address-container">
                  <h6>{address.type}</h6>
                  <p>{address.line1}</p>
                  <p>{address.line2}</p>
                  <p>{address.line3}</p>
                  <p>
                    {address.city}, {address.stateCode} {address.postalCode}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="contacts">
          <h5>Contacts</h5>
          {place?.contacts ? (
            <div className="ea-contact">
              {place?.contacts?.phoneNumbers.map((contact) => (
                <div key={contact.type} className="contact-container">
                  <h6>{contact.type}</h6>
                  <p>{contact.phoneNumber}</p>
                  <p>{contact.extension}</p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      <section className="place-info-container__directions">
        <h5>Directions</h5>
        <p>{place?.directionsInfo}</p>
        <Link to={place?.directionsUrl}>Get Directions</Link>
      </section>
      <section className="place-info-container__other">
        <h5>Hours / Entrance Fees</h5>
        <Link to={place?.url}>Visit Official Page</Link>
      </section>
      <section className="place-info-container__weather">
        <CurrentWeather weather={weather} />
        <div className="hourly">
          <h3>Hourly</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temp</th>
                <th>Feels</th>
              </tr>
            </thead>
            <tbody>
              {weather?.hourly && (
                <>
                  {weather?.hourly.map((hour, idx) => {
                    if (idx < 6) {
                      return (
                        <tr
                          key={idx}
                          style={{
                            background:
                              hour.weather[0].main === "Clear"
                                ? "skyblue"
                                : "lightgray",
                          }}
                        >
                          <td>{hour.dateTime}</td>
                          <td>{hour.temperature}</td>
                          <td>{hour.feelsLike}</td>
                        </tr>
                      );
                    }
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="daily">
          <h3>Daily</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Min</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {weather?.daily && (
                <>
                  {weather?.daily.map((day, idx) => {
                    if (idx > 0 && idx < 5) {
                      return (
                        <tr
                          key={idx}
                          style={{
                            background:
                              day.weather[0].main === "Clear"
                                ? "skyblue"
                                : "lightgray",
                          }}
                        >
                          <td>{day.date}</td>
                          <td>{day.minTemp}</td>
                          <td>{day.maxTemp}</td>
                        </tr>
                      );
                    }
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default PlaceInfo;
