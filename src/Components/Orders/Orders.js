import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrderAction, fetchOrdersAction } from "../../actions/orderAction";
import { fetchProductsAction } from '../../actions/productActions'
import Button from "../Button/Button";
import Logo from '../Logo/Logo';

import './Orders.scss';

const Orders = (props) => {
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    props.fetchOrders();
  },[orderId])

  useEffect(() => {
    props.fetchProducts();
    console.log('Products in Order Component: ', props.products);
  },[])

  const handleChange = (e) => {
    e.preventDefault();
    setOrderId(e.target.value);
  };

  const runDeleteOrder = () => {
    props.deleteOrder(orderId);
    setOrderId(null);
  };

  const keyPressed = (e) => {
    if (e.key === "Enter" || e.key === 13 ) {
      props.deleteOrder(orderId);
      setOrderId(null);
    }
  }
  
  return !props.orders ? (
    <div className="orders">
      <Link className="home" to="/">HOME</Link>
      Orders
    </div>
    ) : (
    <div className="orders">
        <Link className="home" to="/"><Logo /></Link>
      <div>
      </div>
      <div className="orders-header">
        <h2>ORDERS</h2>
        <input
          placeholder=' Enter order id...'
          required
          onKeyPress={keyPressed}
          onKeyDown={keyPressed}
          onChange={handleChange}
        />
        <Button 
          onClick={runDeleteOrder} 
          className='primary-button' 
          label='Delete' />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>EMAIL</th>
            <th>ITEMS</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.created}</td>
              <td>$ {order.totalPrice}</td>
              <td>{order.email}</td>
              <td>
                {order.orderItems.map((item) => (
                  <div key={item.id}>
                    {item.quantity} {" x "} {item.movieId}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// export default connect(
//   (state) => ({
//     orders: state.order.orders,
//     delete: state.order.delete,
//     products: state.order.products
//   }),
//   {
//     deleteOrder,
//     fetchOrders,
//     fetchProducts
//   }
// )(Orders);

const mapStateToProps = ( state ) => ({ 
  orders: state.order.orders,
  delete: state.order.delete,
  products: state.order.products
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrder: (order) => dispatch(deleteOrderAction(order)),
  fetchOrders: () => dispatch(fetchOrdersAction()),
  fetchProducts: () => dispatch(fetchProductsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders)