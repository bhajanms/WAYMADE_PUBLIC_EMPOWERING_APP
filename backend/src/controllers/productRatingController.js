const Productrating = require("../models/productRatingModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @desc Register User
// @route POST /api/productrating/add
exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
    
      PRODUCT_ID,
      RATING,
      REVIEW,
      USER_ID 
    } = req.body;

    const newProductRating = await Productrating.create({
      PRODUCT_ID,
      RATING,
      REVIEW,
      USER_ID,

      
    });

    res.status(201).json({
      message: "product Review added successfully",
      productrating: newProductRating,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


