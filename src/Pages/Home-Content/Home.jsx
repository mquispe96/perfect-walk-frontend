import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { PageContext } from "../Context/PageContext";
import CreatePost from "./Components/CreatePost";
import "./Styling/home.css";

const Home = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user, location, setLocation } = useContext(PageContext);
  const [posts, setPosts] = useState([]);

  

  return (
    <main className="home-container">
      <section className="home-container__left-panel">
        <CreatePost setPosts={setPosts} />
      </section>
    </main>
  );
};

export default Home;
