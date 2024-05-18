"use client"
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import lottie from "lottie-web";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./assets/animation/before.json",
    });

    return () => {
      animation.destroy();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const header = { "content-type": "application/json" };
    const body = { price: Number(props.price) };
    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch("http://localhost:5000/payment/paymentonline", {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    });

    const clientSecret = await res.json();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret.client_secret,
      confirmParams: {
        return_url: "http://localhost:3000/sucess",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "50%", borderRight: "1px solid #ccc", paddingRight: "20px" }}>
        <div id="lottie-animation" style={{ width: "80%", margin: "0 auto" }}></div>
      </div>
      <div style={{ flex: "30%", marginLeft: "20px" }}>
        <form onSubmit={handleSubmit} style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", padding: "20px",width:"600px", borderRadius: "8px", marginTop:"160px" , height:"500px"}}>
          <div style={{ marginTop: "30px" }}>
           
            <div style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
              <PaymentElement />
            </div>
            <button
              type="submit"
              disabled={!stripe || !elements || isLoading}
              style={{
                width: "160px",
                height: "50px",
                backgroundColor: "green",
                marginBottom:"20px",
                borderRadius: "30px",
                position: "relative",
                display: "block",
                margin: "53px auto",
              
              }}
            >
              {isLoading ? (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                  <i className="fa fa-spinner fa-spin" style={{ color: "white" }}></i>
                  Loading...
                </div>
              ) : (
                "Pay"
              )}
            </button>
            {errorMessage && (
              <div
                style={{
                  color: "red",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid red",
                  marginTop: "-44px",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
              }  

const Payment = (props) => {
  const stripePromise = loadStripe(
    "pk_test_51OrCeZSAHocqgcx7LAgJ0JUt4BYdIq8BfzrpKttBfhEu17OfVe2obH1cVrLOJoXkIx6CJcrtmeOk78TgHSc1e3Zt00phU9TOdk"
  );

  const options = {
    mode: "payment",
    amount: Number(300),
    currency: "usd",
    description: props.description,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm price={props.price} />
    </Elements>
  );
};

export default Payment;
