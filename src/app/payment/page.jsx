"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
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
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)

      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "500px",
        height: "400px",
        borderTopStyle: "double",
        borderTopColor: "green",
      }}
    >
      <h3
        style={{
          justifyContent: "center",
          paddingLeft: "170px",
          paddingTop: "30px",
        }}
      >
        amount :
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-currency-rupee"
          viewBox="0 0 16 16"
        >
          <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"></path>
        </svg>
        {props.price}
      </h3>
      <div
        style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}
      >
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        style={{
          width: "160px",
          height: "50px",
          backgroundColor: "green",
          marginTop: "30px",
          marginLeft: "170px",
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
            <i class="fa fa-spinner fa-spin" style={{ color: "white" }}></i>
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

            borderColor: "white",
            padding: "23px",
            paddingLeft: " 140px",
            borderRadius: "5px",
            border: "1px solid transparent",
            marginBottom: "10px",
            boxShadow: "0 0 0.5rem white",
          }}
        >
          {errorMessage}
        </div>
      )}
    </form>
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

    //   // Fully customizable with appearance API.
    //   appearance: {
    //     /*...*/
    //   }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm price={props.price} />
    </Elements>
  );
};
export default Payment;
