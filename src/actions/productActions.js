import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_BY_SEARCH } from '../types';
import axios from "axios";

export const fetchProductsAction = () => async (dispatch) => {
  await axios.get("/movie")
  .then((res) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data.data,
      });
    }, (error) => {
    console.log(error);
  })
};

export const sortProductsAction = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }

  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};

export const filterSearchAction = (products, searchTerm) => (dispatch) => {

  dispatch({
    type: FILTER_BY_SEARCH,
    payload: {
      searchResult: 'Search...'
    },
  });
};


