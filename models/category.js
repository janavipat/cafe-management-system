// category.js

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "category",
  }
);

const Category = mongoose.model("Category", categorySchema); // Change model name to "Category"

module.exports = Category;
