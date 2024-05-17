"use client";
import React, { useEffect, useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Header = (props) =>{ 
  
const cartStorage = JSON.parse(localStorage.getItem('cart'));
const [cartNumber , setCartNumber] = useState(cartStorage?.length);
const [cartItem, setCartItem] = useState(cartStorage || []);
console.log(props.Cart)
useEffect(()=>{
  if(props.Cart){
    if(cartNumber){
      let localcartitem = [...cartItem];
       localcartitem.push(JSON.parse(JSON.stringify(props.Cart)));
       setCartItem(localcartitem);
       setCartNumber(cartNumber + 1);
       localStorage.setItem('cart', JSON.stringify(localcartitem));
    }else{
      setCartNumber(1);
      setCartItem(props.Cart);
      localStorage.setItem('cart', JSON.stringify([props.Cart]));

    }
  }
},[props.Cart]);
  
  
  return(
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#333', color: '#fff' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="../../assets/img/cafe.png" alt="Logo" style={{ maxWidth: '30px' }} />
        <span style={{ marginLeft: '10px' }}>Coffee with us</span>
      </div>
      <nav>
        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
          <li style={{ display: 'inline', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</a></li>
          <li style={{ display: 'inline', marginRight: '20px' }}><a href="/about" style={{ textDecoration: 'none', color: '#fff' }}>About</a></li>
          <li style={{ display: 'inline', marginRight: '20px' }}><a href="/order" style={{ textDecoration: 'none', color: '#fff' }}>Order</a></li>
        </ul>
      </nav>
      <div className="profile">
        <a href="/cart"><AddShoppingCartIcon /></a>
        {cartNumber}
        <a href="#" style={{ textDecoration: 'none', color: '#fff', border: '1px solid #fff', padding: '5px 10px', borderRadius: '5px' }}>Profile</a>
      </div>
    </header>
);
}
export default Header;
