import {
  FETCH_GENRES,
  FILTER_PRODUCTS_BY_GENRE,
} from "../types";

export const genreReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GENRES:
      return { 
        genres: action.payload, 
      };
    case FILTER_PRODUCTS_BY_GENRE:
      return {
        ...state,
        genre: action.payload.genre,
        productsFilteredByGenre: action.payload.products,
      };
    default:
      return state;
  }
};
