import React, { useEffect } from 'react';
import './Filter.scss';

import { connect } from 'react-redux';
import { sortProductsAction } from '../../actions/productActions';
import { filterProductsByGenreAction } from '../../actions/genreActions';

const Filter = (props) => {

  const getGenres = (genres) => {
    if (genres) {
      return genres.map((genre, i) => (
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
          value={props.sort}
          onChange={(e) =>
            props.sortProducts(
              props.filteredProducts,
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
            value={props.genre} 
            onChange={(e) => 
              props.filterProductsByGenre(
                props.products, 
                e.target.value)
              } 
            >
              <option value="">Genres</option>
            {getGenres(props.genres)}
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
