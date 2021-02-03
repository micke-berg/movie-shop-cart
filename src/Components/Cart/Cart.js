import React, { useState, useEffect, useRef } from 'react'
import './Cart.scss'

import Modal from "react-modal";
import { Fade, Zoom } from "react-awesome-reveal";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Scrollbars } from "react-custom-scrollbars";
import Button from '../Button/Button';

const Cart = ({ cartItems, removeFromCart, totalQuantity, createOrder }) => {
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
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

  const clearOrder = () => {
    setOrderState(null);
    // resetCartItems();
    setTotalPrice(0);
    localStorage.clear();
  };

  const closeModal = () => {
    clearOrder();
    setShowSubmittedModal(false);
  };

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "rgba(120, 120, 120, 0.9)"
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const CustomScrollbars = props => (
    <Scrollbars
      // renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  );

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowCart(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return <div ref={wrapperRef}>{props.children}</div>;
  }

  return (
    <div className="cart-container">
          <OutsideAlerter>
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
                {showSubmittedModal && (
                  <Modal
                    isOpen={true}
                    onRequestClose={() => closeModal()}
                    >
                    <Zoom>
                      <div className='bg-dark'>
                        <div className='order-details'>
                          <span className='close-modal '>
                            <button
                              className='button-close-modal'
                              onClick={() => closeModal()}>
                              +
                            </button>
                          </span>
                          <div className='success-message'>
                            Your order has been placed
                          </div>
                          <h2>Order: {Math.floor(Math.random() * 11000 - 6000)}</h2>
                          <ul>
                            <li>
                              <div>Name:</div>
                              <div>{orderState.name}</div>
                            </li>
                            <li>
                              <div>Email:</div>
                              <div>{orderState.email}</div>
                            </li>
                            <li>
                              <div>Date:</div>
                              <div>{new Date().toISOString()}</div>
                            </li>
                            <li>
                              <div>Total:</div>
                              <div>{totalPrice} KR</div>
                            </li>
                            <li>
                              <div>Cart Items:</div>
                              <div>
                                {cartItems.map((item) => (
                                  <div key={item.movie.id}>
                                    {item.quantity}
                                    {" x "}
                                    {item.movie.name}
                                  </div>
                                ))}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Zoom>
                  </Modal>
                )}
                <div>
                  <CustomScrollbars
                    style={{ width: 336, }}
                    // autoHide
                    // autoHideTimeout={1200}
                    // autoHideDuration={400}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={316}
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
                  </CustomScrollbars>
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
                        {/* <label>Email:</label> */}
                        <input 
                          type="email" 
                          name="email"
                          required
                          onChange={handleInput}
                          placeholder="Email..."
                          />
                      </li>
                      <li>
                        {/* <label>Name:</label> */}
                        <input 
                          type="text" 
                          name="name"
                          required
                          onChange={handleInput}
                          placeholder="Name..."
                          />
                      </li>
                      <li>
                        {/* <label>Address:</label> */}
                        <input 
                          type="text" 
                          name="address"
                          required
                          onChange={handleInput}
                          placeholder="Address..."
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
</OutsideAlerter>
    </div>
  )
}

export default Cart
