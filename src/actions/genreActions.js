import { FETCH_GENRES, FILTER_PRODUCTS_BY_GENRE } from '../types';
import axios from "axios";

export const fetchGenresAction = () => async (dispatch) => {
  await axios.get("/genre")
  .then((res) => {
    dispatch({ 
      type: FETCH_GENRES, 
      payload: res.data.data || []
    });
  }, (error) => {
    console.log(error);
  })
};

// TODO get this to work
export const filterProductsByGenreAction = (products, genre) => (dispatch) => {
  console.log('filteredProducts:...', products);
  console.log('productsFilteredByGenre:', genre);

  dispatch({
    type: FILTER_PRODUCTS_BY_GENRE,
    payload: {
      genre: genre,
      items:
      genre === ""
          ? products
          : products.filter((x) => x.genres.indexOf(genre) >= 0),
    },
  });
};
