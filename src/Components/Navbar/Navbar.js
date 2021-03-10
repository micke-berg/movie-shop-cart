import React from 'react';
import './Navbar.scss';
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';
// import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Cart from '../Cart/Cart';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="nav-element-left">
        <Link className="nav-links-logo" to="/"><Logo /></Link>
        <Link className="nav-links" to="/">Home</Link>
        <Filter />
      </div>
      <div className="nav-element-right">
        {/* <Search /> */}
        <Cart />
        <Link to="/admin"><div className="custom-arrow3"></div></Link>
      </div>
    </nav>
  )
}

export default Navbar
