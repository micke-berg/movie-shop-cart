import {
  FETCH_PRODUCTS,
  // FETCH_GENRES,
  // FILTER_PRODUCTS_BY_GENRE,
  FILTER_BY_SEARCH,
  ORDER_PRODUCTS_BY_PRICE,
} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { 
        items: action.payload, 
        filteredItems: action.payload,
        movies: action.payload,
        success: action.payload,
      };
    case FILTER_BY_SEARCH:
      return {
        ...state,
        searchResult: action.payload.searchTerm,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    // case FETCH_GENRES:
    //   return { 
    //     genres: action.payload, 
    //   };
    default:
      return state;
  }
};
