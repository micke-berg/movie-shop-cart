import React, { useState, useEffect } from 'react'
import './Hero.scss';
import { connect } from 'react-redux';
import { addToCartAction } from '../../actions/cartActions';
import { fetchProductsAction } from '../../actions/productActions'

import Modal from "react-modal";
import { Fade } from 'react-awesome-reveal';
import Button from '../Button/Button';
import Rating from '../Rating/Rating';
import GenreTags from '../GenreTags/GenreTags';

const Hero = ({
  props,
  products,
  genres,
  fetchProducts,
  addToCart
}) => {
  const [modalProduct, setModalProduct] = useState(null);
  const [randomMovie, setRandomMovie] = useState(0);

  async function getRandomMovies(products) {
    if (products?.length > 0 ) {
      const randomIndex = await Math.floor(Math.random() * (products.length - 1));
      const randomIndexMovie = products[randomIndex];
      setRandomMovie(randomIndexMovie);
    }
  }
  
  useEffect(() => {
    getRandomMovies(products);
  },[products]);
  
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const openProductModal = (movie) => {
    setModalProduct(movie);
  }

  const closeProductModal = () => { 
    setModalProduct(null);
  };

  const heroModalStyles = {
    overlay: {
      position: "fixed",
      zIndex: "200",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      overflowY: "auto",
    }
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero" style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 15%, transparent 60%), url(${randomMovie.backdrop})` }}>
        </div>
          <div className="hero-info-wrapper">
            <div className="hero-title">
              {randomMovie.title}
            </div>
            <p className="description">
            {truncate(randomMovie.description, 230)}
            </p>
          <div className="actions">
            <button className="button-container primary-button" onClick={() => addToCart(randomMovie)} label="Add to Cart">Add to Cart</button>
            <Button onClick={() => openProductModal(randomMovie)} secondary label="More Info"/>
          </div>
        </div>
        <div className="fade-bottom"></div>
      </section>
      {modalProduct && 
        <Modal 
        isOpen={true} 
        onRequestClose={closeProductModal}
        style={heroModalStyles}
        className="hero-modal"
      >
        <Fade duration={200}>
          <div className="hero-modal-wrapper">
            <button 
              onClick={() => closeProductModal() } 
              className="close-modal" />
            <div className="movie-details">
              <img src={randomMovie.image} alt={randomMovie.title}/>      
              <div className="movie-details-description">
                <div>
                  <p className="movie-details-title">{randomMovie.title}</p>
                <p>{randomMovie.releaseDate}</p>
                </div>
                <GenreTags
                    productGenres={randomMovie.genres}
                    genres={genres}
                  />
                  <Rating rating={randomMovie.rating}/>
                <p>{truncate(randomMovie.description, 280)}</p>
                <button onClick={() => {addToCart(modalProduct); closeProductModal();}} className="modal-button">Add to cart</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>}
    </>
  )
}

const mapStateToProps = ( state ) => ({ 
  products: state.products.filteredItems,
  genres: state.genres.genres,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProductsAction()),
  addToCart: (product) => dispatch(addToCartAction(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero)