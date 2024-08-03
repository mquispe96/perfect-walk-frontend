import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PageContext } from "../Context/PageContext";
import CreatePost from "./Components/CreatePost";
import Post from "./Components/Post";
import "./Styling/home.css";

const Home = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user, location, setLocation } = useContext(PageContext);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get(`${BASE_URL}/posts`).then((res) => setPosts(res.data));
  }, []);

  return (
    <main className="home-container">
      <section className="home-container__left-panel">
        <CreatePost setPosts={setPosts} />
        <div className="posts-container">
          {posts.map((post) => (
            <Post key={post.id} post={post} setPosts={setPosts} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
