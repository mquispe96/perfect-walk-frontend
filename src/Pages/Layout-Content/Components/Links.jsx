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
        <Link className="link" to="/Weather" onClick={handleMenuClick}>
          <TiWeatherCloudy className='icon'/>
          Weather
        </Link>
        <Link className="link" to="/Places" onClick={handleMenuClick}>
          <GrLocation className='icon'/>
          Places
        </Link>
        <Link className="link" to="/About" onClick={handleMenuClick}>
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
      <Link className="link" to="/Weather">
        <TiWeatherCloudy className='icon'/>
        Weather
      </Link>
      <Link className="link" to="/Places">
        <GrLocation className='icon'/>
        Places
      </Link>
      <Link className="link" to="/About">
        <RiFileInfoLine className='icon'/>
        About
      </Link>
    </>
  );
};

export default Links;
