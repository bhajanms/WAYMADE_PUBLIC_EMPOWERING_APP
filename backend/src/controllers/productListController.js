const Product = require("../models/productModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @desc List All Products
// @route GET /api/product/list
exports.list = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
