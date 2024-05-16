"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [newProductName, setNewProductName] = useState('');
const [newProductCategoryName, setNewProductCategoryName] = useState('');
const [newProductDescription, setNewProductDescription] = useState('');
const [newProductPrice, setNewProductPrice] = useState('');
const [newProductStatus, setNewProductStatus] = useState('');
const [update , setUpdate] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchProducts(storedToken);
      fetchcategory(storedToken);
    }
  }, [update]);

  const fetchcategory = async (token)=>{
    try {
        const res = await axios.get('http://localhost:5000/category/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
  }
  const fetchProducts = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/product/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    setUpdate("add")
    try {
      // Find the category ID corresponding to the entered category name
      const selectedCategory = categories.find((category) => category.name === newProductCategoryName);
      if (!selectedCategory) {
        console.error('Category not found');
        return;
      }
  
      // Create a new product instance
      const newProduct = {
        name: newProductName,
        categoryId: selectedCategory._id,
        description: newProductDescription,
        price: newProductPrice,
        status: newProductStatus,
      };
  
      // Send a POST request to add the new product
      const res = await axios.post('http://localhost:5000/product/add', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product added:', res.data);
  
      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    setUpdate("delete")
    try {
      await axios.delete(`http://localhost:5000/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = async (productId) => {
    try {
        setUpdate("edit")
      // Find the category ID corresponding to the entered category name
      const selectedCategory = categories.find((category) => category.name === newProductCategoryName);
      if (!selectedCategory) {
        console.error('Category not found');
        return;
      }
  
      // Prepare the updated product object
      const newProduct = {
        name: newProductName,
        categoryId: selectedCategory._id,
        description: newProductDescription,
        price: newProductPrice,
        status: newProductStatus,
      };
      // Send a PUT request to update the product
      const res = await axios.put(
        `http://localhost:5000/product/update/${id}`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // If the request is successful, update the products state
      if (res.status === 200) {
        const updatedProducts = products.map((product) => {
          if (product._id === productId) {
            return { ...product, ...newProduct };
          }
          return product;
        });
        setProducts(updatedProducts);
      } else {
        console.error('Error editing product:', res.data.error);
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  

  const handleUpdateStatus = async (productId, status) => {
    try {
      const res = await axios.put(
        'http://localhost:5000/product/updatestatus',
        { id: productId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return { ...product, status };
        }
        return product;
      });
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };
  const [id,setId]= useState('');
  const openEditDialog = (productid) => {
   productid ? setId(productid) : "";
    setIsEditDialogOpen(true);
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Products</h1>
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
  <DialogTitle>Edit Product</DialogTitle>
  <DialogContent>update product
  </DialogContent>
  <TextField
      autoFocus
      margin="dense"
      id="productName"
      label="Product Name"
      type="text"
      fullWidth
      value={newProductName}
      onChange={(e) => setNewProductName(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productCategoryId"
      label="Category ID"
      type="text"
      fullWidth
      value={newProductCategoryName}
      onChange={(e) => setNewProductCategoryName(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productDescription"
      label="Description"
      type="text"
      fullWidth
      value={newProductDescription}
      onChange={(e) => setNewProductDescription(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productPrice"
      label="Price"
      type="number"
      fullWidth
      value={newProductPrice}
      onChange={(e) => setNewProductPrice(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productStatus"
      label="Status"
      type="text"
      fullWidth
      value={newProductStatus}
      onChange={(e) => setNewProductStatus(e.target.value)}
    />
  <DialogActions>
    <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleEditProduct} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
  <DialogTitle>Add New Product</DialogTitle>
  <DialogContent>
    <DialogContentText>Enter the details of the new product:</DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="productName"
      label="Product Name"
      type="text"
      fullWidth
      value={newProductName}
      onChange={(e) => setNewProductName(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productCategoryId"
      label="Category ID"
      type="text"
      fullWidth
      value={newProductCategoryName}
      onChange={(e) => setNewProductCategoryName(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productDescription"
      label="Description"
      type="text"
      fullWidth
      value={newProductDescription}
      onChange={(e) => setNewProductDescription(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productPrice"
      label="Price"
      type="number"
      fullWidth
      value={newProductPrice}
      onChange={(e) => setNewProductPrice(e.target.value)}
    />
    <TextField
      margin="dense"
      id="productStatus"
      label="Status"
      type="text"
      fullWidth
      value={newProductStatus}
      onChange={(e) => setNewProductStatus(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsDialogOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleAddProduct} color="primary">
      Add
    </Button>
  </DialogActions>
</Dialog>


      <Button
        variant="contained"
        onClick={() => setIsDialogOpen(true)}
        style={{ backgroundColor: 'orange', color: 'white', marginBottom: '20px' }}
      >
        Add New Product
      </Button>

      <TableContainer component={Paper} style={{ display: 'inline-block', textAlign: 'left' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>price</TableCell>
              <TableCell>category</TableCell>
              <TableCell>description</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {products.map((product) => (
    <TableRow key={product._id}>
      <TableCell>{product.name || "-"}</TableCell>
      <TableCell>{product.price || "-"}</TableCell>
      <TableCell>{  product.categoryId ? product.categoryId.name : "-"}</TableCell>
      <TableCell>{product.description || "-"}</TableCell>
      <TableCell>
        <Button onClick={()=>openEditDialog(product._id)}>
          <EditIcon />
        </Button>
      </TableCell>
      <TableCell>
        <Button onClick={() => handleDeleteProduct(product._id)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductPage;
