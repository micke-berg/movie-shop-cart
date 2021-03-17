import React, { useState, useEffect, useRef } from 'react'
import './Cart.scss'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { createOrderAction, clearOrderAction, fetchOrdersAction } from "../../actions/orderAction";
import { removeFromCartAction, resetCartItemsAction } from "../../actions/cartActions";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Fade } from "react-awesome-reveal";
import Modal from "react-modal";
import Button from '../Button/Button';

const Cart = (props) => {
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const paymentMethods = ["MasterCard", "VISA", "PayPal", "American Express", "Discover"];

  Modal.setAppElement('body');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * (paymentMethods.length - 1));
    const randomPaymentMethod = paymentMethods[randomIndex];
    setPaymentMethod(randomPaymentMethod); 
  }, []);

  useEffect(() => {
    let total = 0;
    props.cartItems.forEach((item) => {
      total = total + item.price * item.quantity;
      return setTotalPrice(total);
    });
    setShakeAnimation(true);
    setTimeout(() => {
      setShakeAnimation(false);
    }, 500);
  }, [props.cartItems]);

  let totalQuantity = 0;
  props.cartItems.map((cartItem) => {
    totalQuantity = totalQuantity + cartItem.quantity
  });

  let customer = {};
  const handleInput = (e) => {
    customer = { ...customer, [e.target.name]: e.target.value}
  }

  let orderDetails = props.cartItems.map((item) => {
    return(
      { 
        MovieId: item.id,     
        Quantity: item.quantity
      }
    ); 
  });

  const createOrders = (e) => {
    e.preventDefault();

    const order = {
      Email: customer.Email,
      Customer: customer,
      TotalPrice: totalPrice,
      PaymentType: paymentMethod,      
      OrderDetails: orderDetails,
    }
    props.createOrder(order);
    setShowSubmittedModal(true);
  }

  const clearOrder = () => {
    customer = {};
    props.clearOrder();
    props.resetCartItems();
    setTotalPrice(0);
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
    return <div style={{ ...style, ...thumbStyle }} { ...props } />;
  };

  const CustomScrollbars = props => (
    <Scrollbars
      renderThumbVertical={renderThumb}
      { ...props }
    />
  );

  function useClickOutside(ref) {
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

  function ClickOutsideWrapper(props) {
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef);
  
    return <div ref={wrapperRef}>{props.children}</div>;
  }

  const cartModalStyles = {
    overlay: {
      position: "fixed",
      zIndex: "200",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      overflowY: "auto",
    },
    content: {
      position: "absolute",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "center",
      top: "50%",
      left: "50%",
      "transform": "translate(-50%, -50%)",
      height: "68%",
      minHeight: "400px",
      margin: "10px 0",
      width: "66vw",
      border: "none",
      background: "#242424",
      padding: "2%",
    },
  }

  return (
    <div className="cart-container">
      <ClickOutsideWrapper>
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
                  {props.cartItems.length === 0 ? (
                    <p className='cart cart-header'>Cart is empty</p>
                      ) : (
                    <p className='cart cart-header'>
                      You have {totalQuantity} item{props.cartItems.length >= 2 ? "s" : ""} in
                      the cart
                    </p>
                  )} 
                  <div>
                    <CustomScrollbars
                      style={{ width: 336, }}
                      autoHeight
                      autoHeightMin={0}
                      autoHeightMax={316}
                    >
                    <div className="cart cart-item-container" >
                      <ul className="cart-items">
                        {props.cartItems.map((item) => (
                        <li key={item.id}>
                          <div>
                            <img src={item.image} alt={item.title}/>
                          </div>
                          <div className="cart-product-info">
                            <div>{item.title}</div>
                            <div className="cart-right">
                              <div>
                                $ {item.price} x {item.quantity}{' '}
                              </div> 
                              <button className="cart-remove-button" onClick={() => props.removeFromCart(item)} >Remove</button>
                            </div>
                          </div>
                        </li>
                        ))}
                      </ul>
                    </div>
                    </CustomScrollbars>
                    {props.cartItems.length !== 0 && 
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
                          <input 
                            type="text" 
                            name="Name"
                            required
                            onChange={handleInput}
                            placeholder="Name..."
                            />
                        </li>
                        <li>
                          <input 
                            type="email" 
                            name="Email"
                            required
                            onChange={handleInput}
                            placeholder="Email..."
                            />
                        </li>
                        <li className="checkout-button">
                          <Button  type="submit" label="Checkout" />
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
      </ClickOutsideWrapper>
      {showSubmittedModal && (
        <Modal
          isOpen={true}
          onRequestClose={() => closeModal()}
          style={cartModalStyles}
          >
          <Fade>
            <div className="cart-modal-wrapper">
              <div className='order-details'>
                  <button
                    className='close-order-modal'
                    onClick={() => closeModal()}>
                  </button>
                <div className='success-message'>
                  Your order has been placed!
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      )}
    </div>
  )
};

const mapStateToProps = ( state ) => ({ 
  order: state.order.order,
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (item) => dispatch(removeFromCartAction(item)),
  resetCartItems: () => dispatch(resetCartItemsAction()),
  createOrder: (order) => dispatch(createOrderAction(order)),
  clearOrder: () => dispatch(clearOrderAction()),
  fetchOrders: () => dispatch(fetchOrdersAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)