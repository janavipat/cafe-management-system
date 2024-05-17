"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useCartContext } from "@/context/cart_context";
import Header from "../common/header";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  marginTop: '20px',
});

export default function RecipeReviewCard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const getImageUrl = (productName) => {
    // If a matched image is found, return its URL; otherwise, return the default image URL
    return `../../assets/order/${productName}.jpg` || "../../assets/order/food.jpg";
  };
  const handleAddToCart = (product) => {
    setCart(product)
    
  };
 



  return (<>
  <Header Cart= {cart}/>
  <CardContainer>
      {products.map((product) => (
        <Card key={product.id} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title={product.name}
            subheader={`Category: ${product.categoryId.name}`}
          />
         <CardMedia
  component="img"
  height="200"
  width="200"
  src={getImageUrl(product.name)}
  alt={product.name}
  onError={(e) => {
    e.target.src =  "../../assets/order/food.jpg"; // Set the default image URL here
  }}
/>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography paragraph>price:</Typography>
            <Typography paragraph>{product.price}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button variant="contained" color="success" onClick={()=> handleAddToCart(product)}>
              ADD
            </Button>
          </CardActions>
        </Card>
      ))}
    </CardContainer>
  
  </>
    
  );
}
