import { FETCH_PRODUCTS } from '../types';

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/movie");
  const data = await res.json();
  console.log('products actions', data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,

  })
};