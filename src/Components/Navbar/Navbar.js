import React, { useState } from 'react';
import './Navbar.scss';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import CartDropdown from '../CartDropdown/CartDropdown';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Navbar = () => {
  const [cart, setCart] = useState([])
  return (
    <nav className="navbar-container">
      <div className="nav-element-left">
        <Logo />
        <button className="button-tertiary button-tertiary-active" label="Home">Home</button>
        <button className="button-tertiary" label="Categories">Genres</button>
      </div>
      <div className="nav-element-right">
        {/* <Search /> */}
        <button className="notifications-menu">
          <ShoppingCartIcon fontSize="medium"/>
          <span className="notification-pill">9</span>
        </button>
        <ArrowDropDownIcon />
        {/* <CartDropdown >{cart}</CartDropdown> */}
      </div>
    </nav>
  )
}

export default Navbar
