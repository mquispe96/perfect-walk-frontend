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
          <RiHome2Line className='icon'/>
          Home
        </Link>
        <Link className="link" to="/weather" onClick={handleMenuClick}>
          <TiWeatherCloudy className='icon'/>
          Weather
        </Link>
        <Link className="link" to="/places" onClick={handleMenuClick}>
          <GrLocation className='icon'/>
          Places
        </Link>
        <Link className="link" to="/about" onClick={handleMenuClick}>
          <RiFileInfoLine className='icon'/>
          About
        </Link>
      </>
    );
  }
  return (
    <>
      <Link className="link" to="/">
        <RiHome2Line className='icon'/>
        Home
      </Link>
      <Link className="link" to="/weather">
        <TiWeatherCloudy className='icon'/>
        Weather
      </Link>
      <Link className="link" to="/places">
        <GrLocation className='icon'/>
        Places
      </Link>
      <Link className="link" to="/about">
        <RiFileInfoLine className='icon'/>
        About
      </Link>
    </>
  );
};

export default Links;
