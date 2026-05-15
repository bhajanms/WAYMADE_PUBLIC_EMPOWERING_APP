const Product = require("../models/productModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @desc Register User
// @route POST /api/product/add
exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      NAME,
      DESCRIPTION,
      PRICE,
      QUANTITY,
      PICTURES,
      LIKE,
      LIKE_COUNT,
      SELLER_ID,
    } = req.body;

    const newProduct = await Product.create({
      NAME,
      DESCRIPTION,
      PRICE,
      QUANTITY,
      PICTURES,
      LIKE,
      LIKE_COUNT,
      SELLER_ID,
    });

    res.status(201).json({
      message: "product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


