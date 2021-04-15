import React, { useEffect } from 'react';
import './Filter.scss';

import { connect } from 'react-redux';
import { sortProductsAction } from '../../actions/productActions';
import { filterProductsByGenreAction } from '../../actions/genreActions';

const Filter = ({
  sort,
  genre,
  genres, 
  products,
  sortProducts,
  filteredProducts,
  filterProductsByGenre
}) => {

  const getGenres = (genres) => {
    if (genres) {
      return genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
        )
      )
    }else { 
      return <option>No genres found</option>
    }
  }

  return (
    <div className="filter">
      <div className="filter-select">
        <div className="filter-sort">
        <select
          value={sort}
          onChange={(e) =>
            sortProducts(
              filteredProducts,
              e.target.value
            )
          }
        >
          <option value="">Price</option>
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
          <div className="custom-arrow1"></div>
        </div>
        
        <div className="filter-genre">
          <select 
            value={genre} 
            onChange={(e) => 
              filterProductsByGenre(
                products, 
                e.target.value)
              } 
            >
              <option value="">Genres</option>
            {getGenres(genres)}
          </select>
          <div className="custom-arrow2"></div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ( state ) => ({
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
    sort: state.products.sort,
    genres: state.genres.genres, 
});

const mapDispatchToProps = (dispatch) => ({
  filterProductsByGenre: (products, genre) => dispatch(filterProductsByGenreAction(products, genre)),
  sortProducts: (filteredProducts, sort) => dispatch(sortProductsAction(filteredProducts, sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
