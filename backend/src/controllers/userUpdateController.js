const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @desc Update User
// @route PUT /api/user/update/:id
exports.update = async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params; // Get user ID from request params
    const updateData = req.body;

    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user record
    const updatedUser = await user.update(updateData);

    // Fetch associated seller data
    const seller = await Seller.findOne({ where: { USER_ID: user.USER_ID } });

    // Check if any fields were updated
    if (updatedUser) {
      res.status(200).json({
        message: "User profile updated successfully",
        data: {
          ...updatedUser.toJSON(), // Convert user object to plain JSON
          seller_id: seller ? seller.SELLER_ID : null, // Include seller_id if it exists, else null
        },
      });
    } else {
      res.status(400).json({ message: "No changes made to the user profile" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
