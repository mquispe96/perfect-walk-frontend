import {useComponentVisible} from '../../Custom-Hooks/useComponentVisible';
import Menu from './Menu';
import {TiThMenu} from 'react-icons/ti';

const NavDropMenu = () => {
  const {ref, isComponentVisible, setIsComponentVisible} =
    useComponentVisible(false);

  const handleMenuClick = () => {
    setIsComponentVisible(prev => !prev);
  }

  return (
    <nav className="page-header__nav-drop-menu-btn" ref={ref}>
      <div className="menu-position">
        <span onClick={() => setIsComponentVisible(prev => !prev)}>
          <TiThMenu className='icon' />
          Menu
        </span>
        {isComponentVisible && <Menu handleMenuClick={handleMenuClick}/>}
      </div>
    </nav>
  );
};

export default NavDropMenu;
