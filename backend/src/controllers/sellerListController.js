const Seller = require("../models/sellerModel");
const User = require("../models/userModel"); // Import the Seller model
require("dotenv").config();

// @desc Get Seller by UserID
// @route GET /api/seller/:userId
exports.getSellerByUserId = async (req, res) => {
  try {
    // const { userId } = req.params;
    // console.log(userId); // Get userId from request params

    // Find the seller by userId (foreign key in the seller table)
    // const seller = await Seller.findOne({ where: { userId } });
    // const seller = await Seller.findOne({ where: { USER_ID: user.USER_ID } });

    // const errors = validationResult(req); // Get validation errors from the request
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    // }

    const { userId } = req.params; // Get userId from request params

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the seller associated with this user
    const seller = await Seller.findOne({ where: { USER_ID: user.USER_ID } });
    console.log(seller);

    // If seller not found, return 404
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Return the seller details
    res.status(200).json({
      message: "Seller retrieved successfully",
      seller,
      
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
