const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

exports.getSellerProducts = async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req); // Get validation errors from the request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    }

    const { userId } = req.params; // Get userId from request params

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the seller associated with this user
    const seller = await Seller.findOne({ where: { USER_ID: user.USER_ID } });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found for this user" });
    }

    // Fetch the products associated with the seller
    const products = await Product.findAll({ where: { SELLER_ID: seller.SELLER_ID } });

    // Check if there are any products for the seller
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this seller" });
    }

    // Return the products for the seller
    res.status(200).json({
      message: "Product listing fetched successfully",
      data: products, // Send the products
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message }); // General error handling
  }
};
