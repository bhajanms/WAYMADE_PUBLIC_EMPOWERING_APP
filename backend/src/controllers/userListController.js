const User = require("../models/userModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @desc Get User by ID
// @route GET /api/user/:id
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request params

    // Find the user by primary key (id)
    const user = await User.findByPk(id);
    
    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
