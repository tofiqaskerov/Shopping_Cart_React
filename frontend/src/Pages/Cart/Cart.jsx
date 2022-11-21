import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { addToCart, clearCart, decreaseCart, removeFromCart, totalPrice } from '../../redux/slices/cartSlices'
import './cart.scss'
const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(totalPrice)
  }, [cart, dispatch])
  const handleRemoveFromCart = cartItem =>{
      dispatch(removeFromCart(cartItem))
  }
  const handleDecreaseCart = cartItem =>{
    dispatch(decreaseCart(cartItem))
  }
  const handleIncreaseCart = cartItem =>{
    dispatch(addToCart(cartItem))
  }
  const handleClearCart = () =>{
    dispatch(clearCart())
  }
  return (
    <div className="cart__container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart__empty'>
          <p>Your cart is empty</p>
          <div className="start__shopping">
            <Link to='/'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) :
        (
          <div>
            <div className='titles'>
              <h3 className="product__title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Qunatity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart__items">
              {cart.cartItems?.map(cartItem => (
                <div key={cartItem.id} className="cart__item">
                  <div className="cart__product">
                    <img src={cartItem.image} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart__product__price">${cartItem.price}</div>
                  <div className="cart__product__quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                  </div>
                  <div className="cart__product__total__price">
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__summary">
              <button className="clear__cart" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="cart__checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className='amount'>${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button>Checkout</button>
                <div className="continue__shopping">
                  <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        )}
    </div>
  )
}

export default Cart