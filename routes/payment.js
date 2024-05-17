const stripe = require("stripe")(
    "sk_test_51OrCeZSAHocqgcx771KeS0No8ILD5H3ba0KUqGP4PhbcXzNQEoP4f6UauapIwqbHGQLx6ONv78965sXps3TURez700KACnyUcb"
  );
  const express = require("express");
const connection = require("../connection");
const router = express.Router();


   router.post("/paymentonline",async (req, res) => {
    try {
      const price = 300;
  
      const paymentIntent = await stripe.paymentIntents.create({
        description: "Software development services",
        shipping: {
          name: "Jenny Rosen",
          address: {
            line1: "510 Townsend St",
            postal_code: "98140",
            city: "San Francisco",
            state: "CA",
            country: "US",
          },
        },
  
        amount: price,
        currency: "usd",
      });
      res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      res.status(500).json({ error: "Could not create PaymentIntent" });
    }
  });
  

  module.exports = router;