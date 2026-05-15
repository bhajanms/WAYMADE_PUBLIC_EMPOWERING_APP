const express = require("express");
const sellerListController = require("../controllers/sellerListController"); // Import the controller

const router = express.Router();

// @desc Get Seller by UserID
// @route GET /api/seller/:userId
router.get("/:userId", sellerListController.getSellerByUserId); // Use the controller function

module.exports = router; // Export the router
