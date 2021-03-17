import React, { useState, useEffect } from 'react';
import './Products.scss';

import { fetchProductsAction } from '../../actions/productActions'
import { fetchGenresAction } from '../../actions/genreActions'
import { addToCartAction } from "../../actions/cartActions";

import { connect } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import Modal from "react-modal";

import Button from '../Button/Button';
import Rating from '../Rating/Rating';
import Spinner from '../Spinner/Spinner';
import GenreTags from '../GenreTags/GenreTags';

const Products = ({
  props, 
  genre,
  genres,
  products,
  fetchProducts,
  fetchGenres,
  addToCart
}) => {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    fetchProducts();
    fetchGenres();
  },[])

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const openModal = (product) => {
    setProduct(product);
  }

  const closeModal = () => { 
    setProduct(null);
  };

  const productModalStyles = {
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
    }
  }

  console.log('genres', genre)

  return (
    <div className="movie-section">
      { !products ? (
        <div>
          <Spinner />
          <p>Loading...</p>
        </div>
        ) : ( 
        <>
        <ul className="movies">
          {!genres ? <div className="movie-selection">Movie selection</div> : <div className="movie-selection">{genre}Action movies</div>}
              {products.map((product) => (
                <li key={product.id} >
                  <div className="movie">
                    <a 
                      href={`#${product.id}`} 
                      onClick={() => openModal(product)}
                    >
                      <img src={product.image} alt={product.title}/>
                    </a>
                    <div className="movie-card-info">
                      <p>{truncate(product.title, 24)}</p>
                      <div>
                        <Button onClick={() => addToCart(product)} label="Add to Cart" className="btn btn-primary" />
                        <div className="movie-price">$ {product.price}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </>
          )
        }
      {product && 
        <Modal 
          isOpen={true} 
          onRequestClose={closeModal}
          style={productModalStyles}
        >
          <Fade duration={200}>
            <div className="modal-wrapper">
              <button 
                onClick={() => closeModal()} 
                className="close-modal" >
              </button>
              <div className="movie-details">
                <img src={product.image} alt={product.title}/>      
                <div className="movie-details-description">
                  <div>
                      <div className="movie-details-title">{product.title}</div>
                  <p>{product.releaseDate}</p>
                    <GenreTags
                      genres={product.genres}
                    />
                  </div>
                    <Rating rating={product.rating}/>
                  <p>{truncate(product.description, 280)}</p>
                  <button 
                    className="modal-button"
                    onClick={() => {addToCart(product); 
                    closeModal();}} 
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>}
    </div>
  )
}

const mapStateToProps = ( state ) => ({
  products: state.products.filteredItems, 
  success: state.products.success, 
  genres: state.genres.genres, 
  genre: state.genres.genre, 
  items: state.products.items 
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProductsAction()),
  fetchGenres: () => dispatch(fetchGenresAction()),
  addToCart: (product) => dispatch(addToCartAction(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products)