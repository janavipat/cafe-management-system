import Link from "next/link";
import React from "react";
import { useProduct } from "../../context/Mycontext";

const socialLinks = [
  {
    imgSrc: '../../assets/img/Footer/facebook.svg',
    link: 'https://facebook.com',
    iconClass: 'fab fa-facebook-f'
  },
  {
    imgSrc: '../../assets/img/Footer/insta.svg',
    link: 'https://instagram.com',
    iconClass: 'fab fa-instagram'
  },
  {
    imgSrc: '../../assets/img/Footer/twitter.svg',
    link: 'https://twitter.com',
    iconClass: 'fab fa-twitter'
  }
];

const Footer = () => {
  const { setSelectedProduct } = useProduct();

  const handleService = (category) => {
    setSelectedProduct(category);
  };

  return (
    <footer style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div className="footer-top" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start', margintop:"100px" }}>
          <div className="footer-widget" style={{ width: '100%', maxWidth: '25%', marginBottom: '20px', marginLeft:"-176px", marginRight:"120px" }}>
          <Link href="/" legacyBehavior>
  <a style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
    <img src="../../assets/img/logo.jpg" alt="logo" style={{ height: '40px', marginRight: '10px' }} />
    <span style={{ marginLeft: '10px', color:"orange", fontWeight:"700", fontSize:"25px" }}>COFFEE WITH US</span>
  </a>
</Link>

            <p style={{ marginBottom: '20px', fontSize:"18px", fontWeight:"500" }}>
            Life begins after coffee, in the cozy embrace of a cafe's ambiance, where stories are shared and dreams take flight:
            </p>
            <div className="request-btn" onClick={() => handleService("")} style={{ cursor: 'pointer', marginBottom: '20px' }}>
              <Link href="/order" legacyBehavior>
                <a style={{ textDecoration: 'none', color: '#fff', backgroundColor: 'orange', padding: '10px 20px', borderRadius: '5px' }}>Request a Service</a>
              </Link>
            </div>
          </div>
          <div className="footer-widget" style={{ width: '100%', maxWidth: '20%', marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '20px' , color:"orange", fontSize:"20px", fontWeight:"700" }}>Explore On</h4>
            <hr style={{ borderTop: '1px solid #444', margin: '40px 0' }} />
            <ul className="footer-menu" style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>Home</a>
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/about" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>About Us</a>
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/order" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>Order</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-widget" style={{ width: '100%', maxWidth: '20%', marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '20px' , color:"orange", fontSize:"20px", fontWeight:"700" }}>Categories</h4>
            <hr style={{ borderTop: '1px solid #444', margin: '40px 0' }} />
            <ul className="footer-menu" style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px' }} onClick={() => handleService("Cortado")}>
                <Link href="/order" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>Cortado</a>
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }} onClick={() => handleService("Espresso")}>
                <Link href="/order" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>Espresso</a>
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }} onClick={() => handleService("Cappuccino")}>
                <Link href="/order" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>Cappuccino</a>
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }} onClick={() => handleService("Americano")}>
                <Link href="/order" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>Americano</a>
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }} onClick={() => handleService("Coffee")}>
                <Link href="/order" legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>Coffee</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-widget" style={{ width: '100%', maxWidth: '30%', marginBottom: '20px'}}>
            <h4 style={{ marginBottom: '20px', color:"orange", fontSize:"20px", fontWeight:"700"  }}>Contacts</h4>
            <hr style={{ borderTop: '1px solid #444', margin: '40px 0' }} />
            <div className="information" style={{ color: '#fff' }}>
              <div className="info" style={{ marginBottom: '20px' }}>
                <div className="icon" style={{ display: 'inline-block', width: '30px', marginRight:"30px" }}>
                    <img src="../../assets/img/phone.svg" alt="phone"  style={{marginRight:"40px"}}/>
                </div>
                <div className="desc" style={{ display: 'inline-block' }}>
                  <a href="tel:+917833445323" style={{ textDecoration: 'none', color: '#fff', display: 'block' }}>+91 7833445323</a>
                  <a href="tel:+917833445323" style={{ textDecoration: 'none', color: '#fff', display: 'block' }}>+91 7833445323</a>
                </div>
              </div>
              <div className="info" style={{ marginBottom: '20px' }}>
                <div className="icon" style={{ display: 'inline-block', width: '30px',  marginRight:"30px" }}>
                 <img src="../../assets/img/gmail.svg" alt="" style={{marginRight:"40px"}} />
                </div>
                <div className="desc" style={{ display: 'inline-block' }}>
                  <a href="mailto:info@example.com" style={{ textDecoration: 'none', color: '#fff', display: 'block' }}>info@example.com</a>
                  <a href="mailto:info@support.com" style={{ textDecoration: 'none', color: '#fff', display: 'block' }}>info@support.com</a>
                </div>
              </div>
              <div className="info" style={{ marginBottom: '20px' }}>
                <div className="icon" style={{ display: 'inline-block', width: '30px', marginRight:"30px" }}>
                <img src="../../assets/img/address.svg" alt="" style={{marginRight:"40px"}}/>

                </div>
                <div className="desc" style={{ display: 'inline-block' }}>
                  <p style={{ margin: '0' }}>Surat, Gujarat, India, 390001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ borderTop: '1px solid #444', margin: '40px 0' }} />
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="copy-right" style={{ fontSize: '15px' }}>
            <span>
              Copyright 2023 WorkDeal | Developed By{" "}
              <a href="https://github.com/janavipat" style={{ paddingLeft: '10px', fontSize: '16px', textDecoration: 'none', color: 'orange' }}>
                Janavi Patel
              </a>
            </span>
          </div>
          <div className="footer-social-media">
            <ul style={{ display: 'flex', listStyle: 'none', padding: '0', margin: '0' }}>
              {socialLinks.map((link, index) => (
                <li key={index} style={{ marginLeft: index !== 0 ? '20px' : '0' }}>
                  <a href={link.link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '20px' }}>
                  <img src={link.imgSrc} alt="" style={{backgroundColor: "white", color:"orange", width:"50px", height:"50px", borderRadius:"40px", boxShadow:"0 0 10px rgba(255, 255, 255, 0.5)"}} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
