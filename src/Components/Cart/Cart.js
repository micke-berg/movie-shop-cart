import React, { useState, useEffect } from 'react'
import './Cart.scss'
import Button from '../Button/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Scrollbars } from "react-custom-scrollbars";

const Cart = ({ cartItems, removeFromCart, totalQuantity, createOrder }) => {
  const [showCart, setShowCart] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderState, setOrderState] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    setShakeAnimation(true);
      setTimeout(() => {
        setShakeAnimation(false);
      }, 500);
  },[cartItems]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.movie.price * item.quantity;
      return setTotalPrice(total);
    });
  }, [cartItems]);

  const handleInput = (e) => {
    setOrderState({ ...orderState, [e.target.name]: e.target.value });
  }

  const createOrders = (e) => {
    e.preventDefault();

    const order = {
      name: orderState.name,
      email: orderState.email,
      address: orderState.address,
      cartItems: cartItems 
    }
    createOrder(order);
    console.log(order);
  }

  return (
    <div className="cart-container">
      <div className="cart-icons" onClick={() => setShowCart(!showCart)} >
        {totalQuantity > 0 && <span className={`cart-icon-pill ${shakeAnimation ? 'shake' : ''}`}>{totalQuantity}</span>}
        <ShoppingCartIcon fontSize="medium" className="cart-icon" />
      </div>
      <div className="cart-dropdown-container" >
        <div>
          {showCart && (
            <div className="cart-dropdown" >
              <div className="custom-arrow4"></div>
              <div>
                {cartItems.length === 0 ? (
                  <p className='cart cart-header'>Cart is empty</p>
                    ) : (
                  <p className='cart cart-header'>
                    You have {totalQuantity} item{cartItems.length >= 2 ? "s" : ""} in
                    the cart
                  </p>
                )} 
                <div>
                  <Scrollbars 
                  style={{ width: 336}}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                  autoHeight
                  autoHeightMin={0}
                  autoHeightMax={316}
                  // thumbMinSize={30}
                  >
                  <div className="cart cart-item-container" >
                    <ul className="cart-items">
                      {cartItems.map((item) => (
                      <li key={item.movie.id}>
                        <div>
                          <img src={item.movie.image} alt={item.movie.title}/>
                        </div>
                        <div className="cart-product-info">
                          <div>{item.movie.title}</div>
                          <div className="cart-right">
                            <div>
                              $ {item.movie.price} x {item.quantity}{' '}
                            </div> 
                            <button className="cart-remove-button" onClick={() => removeFromCart(item)} >Remove</button>
                          </div>
                        </div>
                      </li>
                      ))}
                    </ul>
                  </div>
                  </Scrollbars>
                  {cartItems.length !== 0 && 
                  <div className="total-price cart-footer">
                    <div>Total: $ {totalPrice}</div>
                    {!showCheckout && (

                    <Button onClick={() => setShowCheckout(true)} label="Proceed" className="btn btn-primary" />
                    )}
                  </div>}
                </div>
              </div>
              {showCheckout && (
              <div>
                <div className="checkout-form-container">
                  <form onSubmit={createOrders}>
                    <ul className="form-container cart-items">
                      <li>
                        <label>Email</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          onChange={handleInput}
                          />
                      </li>
                      <li>
                        <label>Name</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          onChange={handleInput}
                          />
                      </li>
                      <li>
                        <label>Address</label>
                        <input 
                          type="text" 
                          name="address"
                          required
                          onChange={handleInput}
                          />
                      </li>
                      <li className="checkout-button">
                        <Button type="submit" label="Checkout" />
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
