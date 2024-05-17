"use client"
import { useState, useEffect } from 'react';
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

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [token, setToken] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchCategories(storedToken);
    }
  }, []);

  const fetchCategories = async (token) => {
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
  };

  const handleAddCategory = async () => {
    try {
      const res = await axios.post('http://localhost:5000/category/add', { name: newCategoryName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories([...categories, res.data]);
      setNewCategoryName('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
    fetchCategories(token);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/category/delete/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
    fetchCategories(token);
  };

  const openEditDialog = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
    setIsEditDialogOpen(true);
  };

  // Function to handle category update
  const handleUpdateCategory = async () => {
    try {
      const res = await axios.put(
        'http://localhost:5000/category/update',
        { id: editCategoryId, newName: editCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response as needed
      console.log('Category updated:', res.data);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
    fetchCategories(token);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'orange' }}>Categories</h1>
      <TextField
        label="Search Categories"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the name of the category.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="editCategoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCategory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name of the new category.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        onClick={() => setIsDialogOpen(true)}
        style={{ backgroundColor: 'orange', color: 'white', marginBottom: '20px' }}
      >
        Add New Category
      </Button>

      <TableContainer component={Paper} style={{ display: 'inline-block', textAlign: 'left' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .filter((category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button onClick={() => openEditDialog(category._id, category.name)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteCategory(category._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );}

export default CategoryPage;
