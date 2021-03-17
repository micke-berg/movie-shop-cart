import { FETCH_PRODUCTS, FETCH_GENRES } from '../types';

import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  await axios.get("/movie")
    .then((res) => {
      console.log('fetchProducts:', res.data);
        dispatch({
          type: FETCH_PRODUCTS,
          payload: res.data.data,
        });
      }, (error) => {
      console.log(error);
    })
  };
  
  export const fetchGenres = () => async (dispatch) => {
    await axios.get("/genre")
    .then((res) => {
        console.log('fetchGenres:', res.data);
      dispatch({ 
        type: FETCH_GENRES, 
        payload: res.data.data,
      });
    }, (error) => {
      console.log(error);
    })
  };