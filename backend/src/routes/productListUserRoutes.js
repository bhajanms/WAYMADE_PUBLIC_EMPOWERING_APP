const express = require("express");
const { param } = require("express-validator"); // Import the param validation method
const productListUserController = require("../controllers/productListUserController");
const Product = require("../models/productModel");

const router = express.Router();

// @desc Get Product Listing for a particular seller
// @route GET /api/products/seller/:userId
router.get(
  "/seller/:userId",
//   [
    // param("userId").isUUID().withMessage("Invalid userId format"), // Validate userId format (UUID as an example)
//   ],
  productListUserController.getSellerProducts // Controller method to handle the logic
);

module.exports = router;
