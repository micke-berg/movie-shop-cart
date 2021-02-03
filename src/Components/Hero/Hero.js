import React, { useState } from 'react'
import './Hero.scss';
import Modal from "react-modal";
import { Fade } from 'react-awesome-reveal';
import Button from '../Button/Button';
import Rating from '../Rating/Rating';
import GenreTags from '../GenreTags/GenreTags';

const Hero = ({ addToCart, heroMovie, backgroundImage }) => {
  const [modalProduct, setModalProduct] = useState(null);

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const openProductModal = (movie) => {
    setModalProduct(movie);
  }

  const closeProductModal = () => { 
    setModalProduct(null);
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero" style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 15%, transparent 60%), url(${heroMovie.image})` }}>
        </div>
          <div className="hero-info-wrapper">
            <div className="hero-title">
              {heroMovie.title}
            </div>
            <p className="description">
            {truncate(heroMovie.description, 180)}
            </p>
          <div className="actions">
            <button className="button-container primary-button" onClick={() => addToCart(heroMovie)} label="Add to Cart">Add to Cart</button>
            <Button onClick={() => openProductModal(heroMovie)} secondary label="More Info"/>
          </div>
        </div>
        <div className="fade-bottom"></div>
      </div>
      {modalProduct && 
        <Modal isOpen={true} onRequestClose={closeProductModal}
          style={{
            overlay: {
              position: "fixed",
              zIndex: "200",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              overflowY: "auto",
            },
            content: {
              position: "absolute",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              top: "50%",
              left: "50%",
              "transform": "translate(-50%, -50%)",
              height: "68%",
              minHeight: "400px",
              margin: "10px 0",
              width: "66vw",
              border: "none",
              background: "#242424",
              padding: "2%",
            },
          }}
        >
          <Fade duration={200}>
            <div className="modal-wrapper">
              <button onClick={() => closeProductModal() } className="close-modal" ></button>
              <div className="movie-details">
                <img src={backgroundImage} alt={heroMovie.title}/>      
                <div className="movie-details-description">
                  <div>
                      <div className="movie-details-title">{heroMovie.title}</div>
                  <p>{heroMovie.releaseDate}</p>
                  </div>
                    <GenreTags genres={heroMovie.movieGenre}/>
                    <Rating rating={heroMovie.rating}/>
                  <p>{truncate(heroMovie.description, 280)}</p>
                  <button onClick={() => {addToCart(modalProduct); closeProductModal();}} className="modal-button">Add to cart</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>}
    </>
  )
}

export default Hero
