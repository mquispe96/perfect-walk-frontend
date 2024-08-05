import {useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useComponentVisible } from '../../Custom-Hooks/useComponentVisible';
import { PageContext } from '../../Context/PageContext';
import {IoMdArrowDropdown} from 'react-icons/io';
import { CgLogOut } from "react-icons/cg";
import { FaHouseUser } from "react-icons/fa";

const UserDropMenu = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { user, setUser } = useContext(PageContext);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsComponentVisible((prev) => !prev);
  };

  const handleLogOut = () => {
    setIsComponentVisible(false);
    setUser(false);
    navigate("/");
  };

  return (
    <section className="page-header__user-drop-menu-btn" ref={ref}>
      <div className="menu-position">
        <span onClick={() => setIsComponentVisible((prev) => !prev)}>
          Welcome, {user.firstName}
          <IoMdArrowDropdown />
        </span>
        {isComponentVisible && (
          <div className="menu">
            <Link to="/profile" onClick={handleMenuClick} className='profile-btn'>
              <FaHouseUser className='icon' />
              Profile
            </Link>
            <button onClick={handleLogOut} className='font-style'>
              <CgLogOut className='icon'/>
              Log Out
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserDropMenu
