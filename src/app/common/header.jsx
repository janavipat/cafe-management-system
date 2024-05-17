"use client"
import React, { useEffect, useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './header.css'; // Import CSS file

const Header = (props) => { 
  const cartStorage = JSON.parse(localStorage.getItem('cart'));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage || []);

  useEffect(() => {
    if (props.Cart) {
      if (cartNumber) {
        let localcartitem = [...cartItem];
        localcartitem.push(JSON.parse(JSON.stringify(props.Cart)));
        setCartItem(localcartitem);
        setCartNumber(cartNumber + 1);
        localStorage.setItem('cart', JSON.stringify(localcartitem));
      } else {
        setCartNumber(1);
        setCartItem(props.Cart);
        localStorage.setItem('cart', JSON.stringify([props.Cart]));
      }
    }
  }, [props.Cart]);
  
  return (
    <header>
      <div className="logo">
        <img src="../../assets/img/cafe.png" alt="Logo" />
        <span>Coffee with us</span>
      </div>
      <nav>
        <ul>
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/about" className="nav-link">About</a></li>
          <li><a href="/order" className="nav-link">Order</a></li>
        </ul>
      </nav>
      <div className="profile">
        <a href="/cart">
          <AddShoppingCartIcon />
          <span className="cart-count">{cartNumber}</span>
        </a>
        <a href="/profile" className="profile-link">Profile</a>
        <a href="/login" className="login-button">Login</a>
      </div>
    </header>
  );
}

export default Header;
