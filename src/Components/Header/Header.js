import React, { useState, useEffect } from 'react'
import './Header.scss';

const Header = () => {
  const [handleShow, setHandleShow] = useState(false);

  useEffect(() => {
    const doSomething = () => {
      console.log("remove");
    };
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHandleShow(true);
      } else setHandleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", doSomething);
    };
  }, []);
  
  return (
      <header className={`header ${handleShow && "nav-black"}`}>
        <a href="/" className="accent">Movies...</a>
      </header>
  )
}

export default Header
