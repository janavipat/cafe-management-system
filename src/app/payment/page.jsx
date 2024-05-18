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
        return_url: "http://localhost:3000/success",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "60%" }}>
        <div id="lottie-animation"></div>
      </div>
      <div style={{ flex: "40%" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Amount: {props.price}</h3>
            <div style={{ margin: "20px" }}>
              <PaymentElement />
            </div>
            <button
              type="submit"
              disabled={!stripe || !elements || isLoading}
              style={{
                width: "160px",
                height: "50px",
                backgroundColor: "green",
                borderRadius: "30px",
                position: "relative",
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "160px",
                    color: "white",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ color: "white" }}
                  ></i>
                  Loading...
                </div>
              ) : (
                "Pay"
              )}
            </button>
            {/* Show error message to your customers */}
            {errorMessage && (
              <div
                style={{
                  color: "red",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid transparent",
                  marginTop: "20px",
                  backgroundColor: "#ffe6e6",
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
};

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
