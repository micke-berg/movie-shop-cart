import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";
import { genreReducer } from "./reducers/genreReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    genres: genreReducer,
    cart: cartReducer,
    order: orderReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
