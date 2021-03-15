import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER, DELETE_ORDER ,FETCH_ORDERS } from "../types";
import axios from "axios";

export const fetchOrders = () => async  (dispatch) => {
  await axios.get("/order")
    .then((res) => {
      console.log('fetchOrders: ', res.data);
      dispatch({ type: FETCH_ORDERS, payload: res.data.data });
    }, (error) => {
      console.log(error);
    }
  );
}

export const createOrder = (order) => async (dispatch) => {
  await axios.post('/order', order).then((result) => {
        console.log('POST Order: ', result.data);
        console.log( JSON.stringify(order))
        dispatch({ 
          type: CREATE_ORDER, 
          payload: result
        });
        localStorage.clear("cartItems");
        dispatch({ type: CLEAR_CART });
  }, (error) => {
    console.log(error);
  });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};

export const deleteOrder = (id) => async (dispatch) => {
  await axios.delete(`/order/${id}`).then((result) => {
    console.log("delete orders result", result);
    dispatch({ type: DELETE_ORDER });
  });
}









