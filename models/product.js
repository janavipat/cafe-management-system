// product.js

const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const Category = require("./category"); // Import the Category model

const productSchema = new mongoose.Schema(
  {
   id:{
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
   },
   name:{
    type: String,
    required: true,
    
   },
   categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
   },
   description:{
    type: String,
    required: true,
   },
   price:{
    type: Number,
    required: true,
   },
   status:{
    type: String,
    default:"true",
    required: true,
   }
  },
  {
    collection: "product",
  }
);

const mydb = mongoose.connection.useDb('cafe');
const Product = mydb.model("Product", productSchema); // Change model name to "Product"

module.exports = Product;
