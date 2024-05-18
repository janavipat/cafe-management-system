"use client"

import React from "react";

function CustomError() {
  return (
    <section className="error-area sec-m">
      <div className="container">
        <div className="error-content">
          <img src="../../assets/img/error.png" alt="Error Image" style={{marginLeft:"450px", marginTop:"70px"}} />
          <h2>Sorry, we can’t find that page</h2>
          <p>
            The page you are looking for may have been moved, removed, renamed,
            or never existed.
          </p>
          <div className="cmn-btn">
            <a href="/">
              <a className="btn" style={{backgroundColor:"green", color:"white", fontSize:"25px", fontWeight:"700"}}>Back to Home</a>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .error-area {
          background: url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg') center center no-repeat;
          background-size: cover;
         height:770px;
          padding: 100px 0;
          color: #fff; /* Adjusting text color */
        }
        .error-content {
          text-align: center;
        }
        .error-content img {
          max-width: 100%;
          height: auto;
          margin-bottom: 30px;
        }
        .error-content h2 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #fff; /* Changing heading color */
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Adding text shadow for better visibility */
        }
        .error-content p {
          font-size: 18px;
          margin-bottom: 40px;
          color: #fff; /* Changing paragraph color */
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Adding text shadow for better visibility */
        }
        .cmn-btn {
          display: inline-block;
        }
        .cmn-btn .btn {
          display: inline-block;
          padding: 10px 20px;
          border: 2px solid #fff; /* Changing button border color */
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .cmn-btn .btn:hover {
          background: rgba(255, 255, 255, 0.2); /* Changing button background color on hover */
          color: #333; /* Changing button text color on hover */
        }
      `}</style>
    </section>
  );
}

export default CustomError;
