const Product = require("../models/productModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @desc List a Specific Product by ID
// @route GET /api/product/:id
exports.getProductDetails = async (req, res) => {
  const { id } = req.params; // Getting the product ID from the request parameters
  
  try {
    // Find a single product by its ID
    const product = await Product.findByPk(id);

    // If no product is found, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If product is found, return the details
    res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
