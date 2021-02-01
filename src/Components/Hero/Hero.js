import React from 'react'
import './Hero.scss';
import Button from '../Button/Button';

const Hero = ({ title, backgroundImage , description, addToCart, movie }) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero" style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 15%, transparent 60%), url(${backgroundImage})` }}>
        </div>
          <div className="hero-info-wrapper">
            <div className="hero-title">
              {title}
            </div>
            <p className="description">
            {truncate(description, 180)}
            </p>
          <div className="actions">
          <button className="button-container primary-button" onClick={() => addToCart(movie)} label="Add to Cart">Add to Cart</button>
            <Button onClick={() => addToCart(movie)} secondary label="More Info" />
          </div>
        </div>
        <div className="fade-bottom"></div>
      </div>
    </>
  )
}

export default Hero
