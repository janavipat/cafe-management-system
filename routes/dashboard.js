const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Bill = require('../models/bill');
const Product = require('../models/product');

// API endpoint to get counts of categories, bills, and products
router.get('/counts', async (req, res) => {
    try {
        const categoryCount = await Category.countDocuments();
        const billCount = await Bill.countDocuments();
        const productCount = await Product.countDocuments();

        return res.status(200).json({
            categoryCount: categoryCount,
            billCount: billCount,
            productCount: productCount
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
