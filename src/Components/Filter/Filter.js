import React from 'react';
import './Filter.scss';

import { connect } from 'react-redux';
import { filterProducts, sortProducts, fetchGenres, fetchProducts } from '../../actions/productActions';

const Filter = (props) => {

  console.log('Products filter: ', props.products);
  console.log('Genres filter: ', props.genres);

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
              props.filterProducts(
                props.products, 
                e.target.value)
              } 
            >
            <option value="">Genre</option>
            {/* {props.genres.map((genre, i) => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
            ))} */}
            {/* <option value="1">Action</option>
            <option value="2">Thriller</option>
            <option value="3">Drama</option>
            <option value="4">Horror</option>
            <option value="5">Fantasy</option>
            <option value="6">Adventure</option>
            <option value="7">Animation</option>
            <option value="8">Comedy</option>
            <option value="9">Family</option>
            <option value="10">Music</option>
            <option value="11">Fiction</option>
            <option value="12">Science</option>
            <option value="13">Mystery</option>
            <option value="14">History</option>
            <option value="15">War</option> */}
          </select>
          <div className="custom-arrow2"></div>
        </div>
      </div>
    </div>
  )
};

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    genre: state.products.genres,
    products: state.products.items,
    movies: state.products.movies,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
    fetchGenres, 
    fetchProducts
  }
)(Filter);
