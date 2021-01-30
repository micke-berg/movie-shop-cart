import React,{ useState } from 'react';
import './Products.scss';
import Button from '../Button/Button';

const Products = ({ title, movies }) => {
  const [filteredGenre, setFilteredGenre] = useState('');
  const [genreFiltered, setGenreFiltered] = useState('');
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  return (
    <div className="movie-section">
      {genreFiltered ? <div className="movie-selection">{filteredGenre}</div> : <div className="movie-selection">Movie selection</div>}
      <ul className="movies">
        {movies.map((movie) =>(
          <li key={movie.id} >
            <div className="movie">
              <a href={`#${movie.id}`}>
                <img src={movie.image} alt={movie.title}/>
              </a>
              <div className="movie-price">
                <p>{truncate(movie.title, 22)}</p>
                <div>
                  <Button label="Add to Cart" className="btn btn-primary">Add to Cart</Button>
                  <div >$ {movie.price}</div>
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
