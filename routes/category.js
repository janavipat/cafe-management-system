const express = require("express");
const connection = require("../connection");
const router = express.Router();
const Category = require("../models/category");
const jwt = require("jsonwebtoken");
var auth = require("../services/authenticate");
var checkRole = require("../services/checkRole");
require("dotenv").config();

router.post(
  "/add",
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      const newCategory = new Category({
        name: req.body.name,
      });
      const savedCategory = await newCategory.save();

      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/categories", auth.authenticateToken, async (req, res) => {
  try {
    // Fetch all categories from the database, sorted by _id in descending order
    const categories = await Category.find({}, { name: 1 }).sort({ _id: -1 });

    // Send the categories data as a response
    res.status(200).json(categories);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
});

router.put(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      const productId = req.body.id;
      const newName = req.body.newName;
      const updatedProduct = await Category.findByIdAndUpdate(productId, {
        name: newName,
      });
      res.status(200).json(updatedProduct);
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
     
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete('/delete/:categoryId', auth.authenticateToken, async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
