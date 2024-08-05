import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreatePost from "../Home-Content/Components/CreatePost";
import Post from "../Home-Content/Components/Post";
import { formatDate } from "../Helper-Functions/formatDate";
import { PageContext } from "../Context/PageContext";
import { FaEdit } from "react-icons/fa";
import { MdOutlineLockReset } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";
import "./Styling/profile.css";

const Profile = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(PageContext);
  const {
    firstName,
    middleName,
    lastName,
    username,
    email,
    birthDate,
    memberSince,
    locationCity,
    locationState,
    locationZip,
  } = user;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      axios
        .get(`${BASE_URL}/posts/user/${user.id}`)
        .then((res) => setPosts(res.data));
    }
  }, []);

  return (
    <main className="profile-container">
      <section className="profile-container__left-panel">
        <div className="profile-info">
          <div className="profile-info__header">
            <h2>Profile</h2>
          </div>
          <div className="profile-info__text">
            <h4>
              Name: {firstName} {middleName ? middleName : ""} {lastName}
            </h4>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Birthday: {formatDate(birthDate)}</p>
            <p>Member Since: {formatDate(memberSince)}</p>
            {locationCity || locationState || locationZip ? (
              <p>
                Located in: {locationCity ? locationCity : ""}{" "}
                {locationState ? locationState : ""}{" "}
                {locationZip ? locationZip : ""}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="profile-info__btns switch-btn">
            <button type="button" onClick={() => navigate("/change-password")}>
              <FaEdit />
            </button>
            <button type="button" onClick={() => navigate("/forgot-password")}>
              <MdOutlineLockReset />
            </button>
            <button type="button" onClick={() => navigate("/delete-account")}>
              <TiUserDeleteOutline />
            </button>
          </div>
        </div>
        <CreatePost setPosts={setPosts} />
        <div className="posts-container cell">
          <h2>Your Posts</h2>
          {posts.map((post) => (
            <Post key={post.id} post={post} setPosts={setPosts} />
          ))}
        </div>
      </section>
      <section className="profile-container__right-panel">
        <div className="posts-container">
          <h2>Your Posts</h2>
          {posts.map((post) => (
            <Post key={post.id} post={post} setPosts={setPosts} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
