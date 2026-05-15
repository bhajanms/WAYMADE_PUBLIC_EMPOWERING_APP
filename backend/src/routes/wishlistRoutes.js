const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController'); // Import the controller

// @route POST /api/wishlist/add
// @desc Add a product to the wishlist
router.post('/add', wishlistController.addToWishlist);

module.exports = router;
