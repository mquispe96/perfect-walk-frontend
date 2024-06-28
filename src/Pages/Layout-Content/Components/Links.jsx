import {Link} from 'react-router-dom';
import {RiHome2Line} from 'react-icons/ri';
import {TiWeatherCloudy} from 'react-icons/ti';
import {GrLocation} from 'react-icons/gr';
import {RiFileInfoLine} from 'react-icons/ri';

const Links = ({handleMenuClick}) => {
  if(handleMenuClick) {
    return (
      <>
        <Link className="link" to="/" onClick={handleMenuClick}>
          <RiHome2Line />
          Home
        </Link>
        <Link className="link" to="/Weather" onClick={handleMenuClick}>
          <TiWeatherCloudy />
          Weather
        </Link>
        <Link className="link" to="/Places" onClick={handleMenuClick}>
          <GrLocation />
          Places
        </Link>
        <Link className="link" to="/About" onClick={handleMenuClick}>
          <RiFileInfoLine />
          About
        </Link>
      </>
    );
  }
  return (
    <>
      <Link className="link" to="/">
        <RiHome2Line />
        Home
      </Link>
      <Link className="link" to="/Weather">
        <TiWeatherCloudy />
        Weather
      </Link>
      <Link className="link" to="/Places">
        <GrLocation />
        Places
      </Link>
      <Link className="link" to="/About">
        <RiFileInfoLine />
        About
      </Link>
    </>
  );
};

export default Links;
