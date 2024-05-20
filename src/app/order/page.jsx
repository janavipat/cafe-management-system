"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import RupeeIcon from "@mui/icons-material/AttachMoney";
import Custompaggin from "../common/Custompaggin";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Header from "../common/header";
import { useProduct } from "@/context/Mycontext";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

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

const CardContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "20px",
});

const FilterContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  padding: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
});

const FilterItem = styled("div")({
  flex: "1",
  marginRight: "10px",
});

const StyledPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  "& .MuiPaginationItem-root": {
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
});

export default function RecipeReviewCard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState();

  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { selectedProduct } = useProduct();

  useEffect(() => {
    selectedProduct
      ? setProductName(selectedProduct)
      : setProductName(productName);

    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/order/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: category,
          productName,
          price,
          currentPage,
          limit: 8,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  const getImageUrl = (productName) => {
    return (
      `../../assets/order/${productName}.jpg` || "../../assets/order/food.jpg"
    );
  };
  const handleAddToCart = (product) => {
    setCart(product);
  };

  const handleFilter = () => {
    fetchProducts();
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
    fetchProducts();
  };
  return (
    <>
      <Header Cart={cart} />
      <FilterContainer
        style={{ marginTop: "50px", width: "90%", marginLeft: "90px" }}
      >
        <FilterItem>
          <TextField
            label="Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />
        </FilterItem>
        <FilterItem>
          <TextField
            label="Product"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
          />
        </FilterItem>
        <FilterItem>
          <TextField
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
        </FilterItem>
        <Button
          variant="contained"
          onClick={handleFilter}
          style={{ backgroundColor: "orange" }}
        >
          Filter
        </Button>
      </FilterContainer>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          {products.slice(0, 8).map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  src={product.image || "../../assets/order/food.jpg"} // Use product image or fallback image
                  alt={product.name}
                  style={{
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
                <CardContent sx={{ padding: "16px" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      marginBottom: "8px",
                      minHeight: "60px",
                      fontSize: "20px",
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "20px",
                      fontWeight: "900px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {product.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <RupeeIcon sx={{ marginRight: "4px" }} />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "20px", fontWeight: "700" }}
                      >
                        {product.price}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", padding: "16px" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAddToCart(product)}
                    sx={{ borderRadius: "8px", marginTop: "-20px" }}
                  >
                    ADD
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Custompaggin
          currentPage={currentPage}
          totalPages={totalPages}
          handlePaginationClick={handlePaginationClick}
        />
      </Box>
    </>
  );
}
