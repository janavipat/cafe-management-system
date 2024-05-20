"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./cart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const [quality, setQuality] = useState(1);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart"));
    setCartItems(cartStorage || []);
  }, []);

  const handleDeleteItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Number(updatedCart[index].quantity) + 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity = Number(updatedCart[index].quantity) - 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const name = decodedToken.name;
    const email = decodedToken.email;
    const contact = "1231231231"; 

    const orderDetails = {
      name: "user",
      email,
      contact,
      paymentmethod: "card",
      total: cartItems.reduce(
        (acc, curr) => acc + (curr.price * curr.quantity || 0),
        0
      ),
      productdetails: JSON.stringify(cartItems),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/bill/generateReport",
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/payment");
      } else {
        console.error("Failed to generate report", response.data);
      }
    } catch (error) {
      console.error("Error generating report", error);
    }
    localStorage.removeItem('cart');

  };

 
  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + (curr.price * curr.quantity || 0),
    0
  );

  return (
    <>
      <div className="cart-container">
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
                <td>$ {Number(item.price)}</td>
                <td>
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    style={{ marginRight: "30px" }}
                  >
                    -
                  </button>
                  {isNaN(item.quantity) || item.quantity === ""
                    ? 1
                    : Number(item.quantity)}
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    style={{ marginLeft: "30px" }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">
                <strong>Total:</strong>
              </td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                <img src="../../assets/img/rupee.svg" alt="" width={20} />
                <span class="price">{totalPrice}</span>
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <button onClick={handleCheckout}>Checkout</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default CartPage;
