import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PageContext } from "../Context/PageContext";
import CreatePost from "./Components/CreatePost";
import Post from "./Components/Post";
import CurrentWeather from "../Shared-Components/CurrentWeather";
import Place from "../Places-Content/Components/Place";
import "./Styling/home.css";

const Home = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user, location } = useContext(PageContext);
  const [posts, setPosts] = useState([]);
  const [weather, setWeather] = useState({});
  const [places, setPlaces] = useState([]);

  const pickRandomPlace = () => {
    const randomIndex = Math.floor(Math.random() * places.length);
    return randomIndex;
  };

  const randomPlace = places[pickRandomPlace()];

  useEffect(() => {
    axios.get(`${BASE_URL}/posts`).then((res) => setPosts(res.data));
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(
          `${BASE_URL}/weather/byCoords?lat=${location.latitude}&long=${location.longitude}`
        )
        .then((res) => setWeather(res.data));
    }
  }, [location]);

  useEffect(() => {
    if (location.place) {
      axios
        .get(`${BASE_URL}/locations/byState?stateCode=${location.place}`)
        .then((res) => setPlaces(res.data));
    }
  }, [location]);

  return (
    <main className="home-container">
      <section className="home-container__left-panel">
        {user && <CreatePost setPosts={setPosts} />}
        <div className="posts-container">
          <h2>Posts</h2>
          {posts.map((post) => (
            <Post key={post.id} post={post} setPosts={setPosts} />
          ))}
        </div>
      </section>
      <section className="home-container__right-panel">
        <CurrentWeather weather={weather} setWeather={setWeather} />
        <div className="recommended-place">
          <div className="recommended-place__header">
            <h3>Recommended Place Nearby</h3>
          </div>
          <Place place={randomPlace} />
        </div>
      </section>
    </main>
  );
};

export default Home;
