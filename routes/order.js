const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
require("dotenv").config();

router.post("/products", async (req, res) => {
  try {
    let filters = { status: true };
    if (req.body.categoryName) {
      const category = await Category.findOne({ name: req.body.categoryName });
      if (category) {
        filters.categoryId = category._id;
      } else {
        filters.categoryId = "70048941583aaa5b8397cb04";
      }
    }

    if (req.body.productName) {
      filters.name = { $regex: new RegExp(req.body.productName, "i") };
    }

    if (req.body.price) {
      filters.price = req.body.price;
    }
    console.log(req.body);
    const page = parseInt(req.body.currentPage) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filters)
      .skip(skip)
      .limit(limit)
      .populate("categoryId");

    res.json({
      products,
      totalPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
