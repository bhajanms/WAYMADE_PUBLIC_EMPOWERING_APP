const Seller = require("../models/sellerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @route POST /api/seller/add
exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      COMPANY_NAME,
      DESCRIPTION,
      USER_ID,
      PICTURES

    } = req.body;

    const newSeller = await Seller.create({
      COMPANY_NAME,
      DESCRIPTION,
      USER_ID,
      PICTURES,
    
    });

    res.status(201).json({
      message: "seller added successfully",
      seller: newSeller,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


