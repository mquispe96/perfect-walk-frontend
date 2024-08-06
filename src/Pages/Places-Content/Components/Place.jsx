import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Place = ({place}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const {pathname} = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        if (prev === place?.images.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }
    , 3000);
    return () => clearInterval(interval);
  }, [place?.images]);
  
  return (
    <div className={`place-container ${pathname.includes('places') ? 'grid-box' : ''}`}>
      <div className='place-container__images-show'>
        <img src={place?.images[imageIndex]?.url} alt='place' />
      </div>
      <div className='place-container__text'>
        <h4>{place?.fullName}</h4>
      </div>
      <div className='place-container__see-more'>
        <Link to={`/place/${place?.parkCode}`}>See More</Link>
      </div>
    </div>
  )
}

export default Place
