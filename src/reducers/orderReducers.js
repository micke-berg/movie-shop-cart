import { CREATE_ORDER, CLEAR_ORDER, DELETE_ORDER, FETCH_ORDERS } from "../types";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.payload };
    case CLEAR_ORDER:
      return { order: null };
    case DELETE_ORDER:
      return { orders: action.payload };
    case FETCH_ORDERS:
      return { orders: action.payload };
    default:
      return state;
  }
};
