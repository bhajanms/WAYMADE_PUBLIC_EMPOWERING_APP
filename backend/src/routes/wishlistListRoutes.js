const express = require('express');
const router = express.Router();
const wishlistListController = require('../controllers/wishlistListController'); // Import the controller for the wishlist

// Define the GET route to fetch wishlist items for a user
router.get('/:USER_ID', wishlistListController.list);

module.exports = router;
