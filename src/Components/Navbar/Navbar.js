import React from 'react';
import './Navbar.scss';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Cart from '../Cart/Cart';

const Navbar = ({ 
  price, 
  sortMovies, 
  filterMovies, 
  totalQuantity,
  removeFromCart,
  createOrder,
  cartItems }) => {

  return (
    <nav className="navbar-container">
      <div className="nav-element-left">
        <Logo />
        <a href="/">Home</a>
        <Filter  
          price={price}
          filterMovies={filterMovies}
          sortMovies={sortMovies}
        />
      </div>
      <div className="nav-element-right">
        {/* <Search /> */}
        <Cart 
          cartItems={cartItems} 
          removeFromCart={removeFromCart}
          totalQuantity={totalQuantity} 
          createOrder={createOrder}
        />
        <a href="#admin">
          <div className="custom-arrow3"></div>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
