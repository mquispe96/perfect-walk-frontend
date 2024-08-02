import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import "./Styling/layout.css";
import SignInBtn from "./Components/SignInBtn";
import NavBar from "./Components/NavBar";
import NavDropMenu from "./Components/NavDropMenu";
import UserDropMenu from "./Components/UserDropMenu";
import { PageContext } from "../Context/PageContext";

const Layout = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : false;
  });
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    place: null,
  });
  const { pathname } = useLocation();
  const checkPath = pathname !== "/login" && pathname !== "/signup";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const place = await axios.get(`${BASE_URL}/userlocation/locationName?lat=${position.coords.latitude}&long=${position.coords.longitude}`).then((res) => res.data);
          setLocation((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            place: place.stateCode,
          }));
        },
        async (err) => {
          const res = await axios
            .get(`${BASE_URL}/userlocation/byIP`)
            .then((res) => res.data);
          setLocation((prev) => ({
            ...prev,
            latitude: res.latitude,
            longitude: res.longitude,
            place: res.place,
          }));
        }
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <PageContext.Provider value={{ location, setLocation, user, setUser }}>
      <header className="page-header font-style">
        <NavBar />
        <NavDropMenu />
        <div className="page-header__title">
          <h1>Perfect Walk</h1>
        </div>
        {user ? <UserDropMenu /> : checkPath ? <SignInBtn /> : ""}
      </header>
      <Outlet />
    </PageContext.Provider>
  );
};

export default Layout;
