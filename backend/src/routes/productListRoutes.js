const express = require("express");
const productListController = require("../controllers/productListController");
const oneProductListController = require("../controllers/oneProductListController");
const Product = require("../models/productModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

const router = express.Router();

// @desc List All Products
// @route GET /api/product/list
router.get("/list", productListController.list);

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

router.get("/:id", oneProductListController.getProductDetails);

module.exports = router;