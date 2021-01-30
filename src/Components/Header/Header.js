import React, { useState, useEffect } from 'react'
import './Header.scss';

import Navbar from '../Navbar/Navbar';

const Header = () => {
  const [handleShow, setHandleShow] = useState(false);

  useEffect(() => {
    const doSomething = () => {
      console.log("remove");
    };
    window.addEventListener("scroll", () => {
      if (window.scrollY > 75) {
        setHandleShow(true);
      } else {
        setHandleShow(false)
      };
    });
    return () => {
      window.removeEventListener("scroll", doSomething);
    };
  }, []);
  
  return (
      <header className={`header ${handleShow && "nav-black"}`}>
        <Navbar />
      </header>
  )
}

export default Header
