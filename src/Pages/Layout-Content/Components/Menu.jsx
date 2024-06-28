import Links from './Links';

const Menu = ({handleMenuClick}) => {
  return (
    <div className="menu">
      <Links  handleMenuClick={handleMenuClick}/>
    </div>
  );
};

export default Menu;
