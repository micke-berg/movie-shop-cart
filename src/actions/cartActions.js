import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  RESET_CART_ITEMS 
} from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  console.log('cartItems', product);
  const cartItems = getState().cart.cartItems.slice();
  let alreadyAddedIndex = -1;

  if (cartItems.length > 0) {
    cartItems.map((cartItem, index) => {
      if (cartItem.id === product.id) {
        alreadyAddedIndex = index;
        cartItem.quantity++;
      }
    });
  }
  if (alreadyAddedIndex === -1) {
    cartItems.push({ ...product, quantity: 1 });
  } 
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();

  cartItems.map((item, index) => {
    if (item === product) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems.splice(index, 1);
      }
    }
  });
  dispatch({ 
    type: REMOVE_FROM_CART, 
    payload: { cartItems } 
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const resetCartItems = () => (dispatch)=> {
  console.log('Reset');
  localStorage.clear();
  dispatch({ type: RESET_CART_ITEMS, payload: [] });
};


