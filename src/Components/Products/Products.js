import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { Fade } from 'react-awesome-reveal';
import './Products.scss';
import Button from '../Button/Button';
import Rating from '../Rating/Rating';
import GenreTags from '../GenreTags/GenreTags';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/productActions'

const Products = ({ filtering, movies, genreTitle, addToCart, fetchProducts }) => {
  const [modalProduct, setModalProduct] = useState(null);

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const openProductModal = (movie) => {
    setModalProduct(movie);
  }

  const closeProductModal = () => { 
    // clearOrder();
    setModalProduct(null);
  };
  
  useEffect(() => {
    fetchProducts();
  },[])

  return (
    <div className="movie-section">
      { !movies ? (<div>Loading...</div>)
        : 
        ( <div>
          {filtering ? <div className="movie-selection">{genreTitle} movies</div> : <div className="movie-selection">Movie selection</div>}
            <ul className="movies">
              {movies.map((movie) =>(
                <li key={movie.id} >
                  <div className="movie">
                    <a href={`#${movie.id}`}>
                      <img onClick={() => openProductModal(movie)} src={movie.image} alt={movie.title}/>
                    </a>
                    <div className="movie-card-info">
                      <p>{truncate(movie.title, 24)}</p>
                      <div>
                        <Button onClick={() => addToCart(movie)} label="Add to Cart" className="btn btn-primary">Add to Cart</Button>
                        <div className="movie-price">$ {movie.price}</div>
                        </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        </div>
          )
        }
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
                <img src={modalProduct.image} alt={modalProduct.title}/>      
                <div className="movie-details-description">
                  <div>
                      <div className="movie-details-title">{modalProduct.title}</div>
                  <p>{modalProduct.releaseDate}</p>
                  </div>
                    <GenreTags genres={modalProduct.movieGenre}/>
                    <Rating rating={modalProduct.rating}/>
                  <p>{truncate(modalProduct.description, 280)}</p>
                  <button onClick={() => {addToCart(modalProduct); closeProductModal();}} className="modal-button">Add to cart</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>}
    </div>
  )
}

export default connect((state) => ({movies: state.products.items}), {fetchProducts})(Products);
