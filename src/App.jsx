import {Route, Routes, Navigate} from 'react-router-dom';
import Layout from './Pages/Layout-Content/Layout';
import Home from './Pages/Home-Content/Home';
import Weather from './Pages/Weather-Content/Weather';
import Places from './Pages/Places-Content/Places';
import PlaceInfo from './Pages/Place-Info-Content/PlaceInfo';
import About from './Pages/About-Content/About';
import Profile from './Pages/Profile-Content/Profile';
import LogIn from './Pages/LogIn-Content/LogIn';
import SignUp from './Pages/SignUp-Content/SignUp';
import ForgotPassword from './Pages/Forgot-Password-Content/ForgotPassword';
import ChangePassword from './Pages/Change-Password-Content/ChangePassword';
import DeleteUser from './Pages/Delete-User-Content/DeleteUser';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/places" element={<Places />} />
        <Route path="/place/:parkCode" element={<PlaceInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/delete-account" element={<DeleteUser />} />
      </Route>
      <Route path="*" element={<Navigate to='/'/>} />
    </Routes>
  );
};

export default App;
