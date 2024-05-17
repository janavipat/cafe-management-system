"use client"
import React, { useState, useEffect } from 'react';
import './cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    setCartItems(cartStorage || []);
  }, []);

  const handleDeleteItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity =Number(updatedCart[index].quantity)+  1;
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                {item.quantity}
                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              </td>
              <td>
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total:</strong></td>
            <td>${totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartPage;
