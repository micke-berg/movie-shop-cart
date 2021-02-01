import React from 'react';
import './Products.scss';
import Button from '../Button/Button';

const Products = ({ filtering, movies, genreTitle, addToCart }) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <div className="movie-section">
      {filtering ? <div className="movie-selection">{genreTitle} movies</div> : <div className="movie-selection">Movie selection</div>}
      <ul className="movies">
        {movies.map((movie) =>(
          <li key={movie.id} >
            <div className="movie">
              <a href={`#${movie.id}`}>
                <img src={movie.image} alt={movie.title}/>
              </a>
              <div className="movie-card-info">
                <p>{truncate(movie.title, 22)}</p>
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

export default Products;
