import {Route, Routes} from 'react-router-dom';
import Layout from './Pages/Layout-Content/Layout';
import Home from './Pages/Home-Content/Home';
import Weather from './Pages/Weather-Content/Weather';
import Places from './Pages/Places-Content/Places';
import About from './Pages/About-Content/About';
import Profile from './Pages/Profile-Content/Profile';
import LogIn from './Pages/LogIn-Content/LogIn';
import SignUp from './Pages/SignUp-Content/SignUp';
import ForgotPassword from './Pages/Forgot-Password-Content/ForgotPassword';
import ChangePassword from './Pages/Change-Password-Content/ChangePassword';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/places" element={<Places />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default App;
