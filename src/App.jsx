import {Route, Routes} from 'react-router-dom';
import Layout from './Pages/Layout-Content/Layout';
import Home from './Pages/Home-Content/Home';
import Weather from './Pages/Weather-Content/Weather';
import Places from './Pages/Places-Content/Places';
import About from './Pages/About-Content/About';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Weather" element={<Weather />} />
        <Route path="Places" element={<Places />} />
        <Route path="About" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
