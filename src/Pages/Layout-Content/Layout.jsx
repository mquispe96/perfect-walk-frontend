import {Outlet} from 'react-router-dom';
import './Styling/layout.css';
import SignInBtn from './Components/SignInBtn';
import NavBar from './Components/NavBar';
import NavDropMenu from './Components/NavDropMenu';

const Layout = () => {
  return (
    <>
      <header className="page-header font-style">
        <NavBar />
        <NavDropMenu />
        <div className="page-header__title">
          <h1>Perfect Walk</h1>
        </div>
        <SignInBtn />
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
