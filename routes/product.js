const express = require("express");
const connection = require("../connection");
const router = express.Router();
const Product = require("../models/product")
const jwt = require("jsonwebtoken");
var auth = require("../services/authenticate");
var checkRole = require("../services/checkRole");
require("dotenv").config();


router.post("/add",auth.authenticateToken,
checkRole.checkRole, async (req, res) => {
    try {
      const { name, categoryId, description, price, status } = req.body;
  
      // Create a new product instance
      const newProduct = new Product({
        name,
        categoryId,
        description,
        price,
        status,
        quentity:1,
      });
  
      // Save the product to the database
      const savedProduct = await newProduct.save();
  
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/products', async (req, res) => {
    try {
      const products = await Product.find({}).populate('categoryId', 'id name');
  
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  
  router.get('/getBycategory/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
      const products = await Product.find({ categoryId, status: 'true' }, 'id name');
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  
  router.get('/getById/:id', auth.authenticateToken, async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  router.put('/update/:id', async (req, res) => {
    const productId = req.params.id;
    const updates = req.body; // Fields to update
    
    try {
        const product = await Product.findByIdAndUpdate(productId, { $set: updates }, { new: true });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
  router.delete('/delete/:id', async (req, res) => {
    const productId = req.params.id;
    
    try {
      const product = await Product.findByIdAndDelete(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  router.put('/updatestatus/:id', auth.authenticateToken, checkRole.checkRole,async (req,res)=>{
    const productId = req.params.id;
    const status = req.body.status;
    try {
      const product = await Product.findByIdAndUpdate(productId, { status: status }, { new: true });
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })

  module.exports = router;