const express = require('express');
const router = express.Router();
const { list } = require('../controllers/cartListController');  // Assuming the controller is located in `controllers/cartController.js`

// Route to get products in cart for a specific user
router.get('/:USER_ID', list);

module.exports = router;
