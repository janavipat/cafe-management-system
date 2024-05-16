"use client";
import React from 'react'

const Header = () => (
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
        <a href="#" style={{ textDecoration: 'none', color: '#fff', border: '1px solid #fff', padding: '5px 10px', borderRadius: '5px' }}>Profile</a>
      </div>
    </header>
);

export default Header;
