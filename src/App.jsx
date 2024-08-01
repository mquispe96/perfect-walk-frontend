import {Route, Routes} from 'react-router-dom';
import Layout from './Pages/Layout-Content/Layout';
import Home from './Pages/Home-Content/Home';
import Weather from './Pages/Weather-Content/Weather';
import Places from './Pages/Places-Content/Places';
import About from './Pages/About-Content/About';
import LogIn from './Pages/LogIn-Content/LogIn';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/places" element={<Places />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
      </Route>
    </Routes>
  );
};

export default App;
