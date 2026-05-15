const Cart = require('../models/cartModel'); // Assuming the Cart model is defined

// @desc Add a product to the cart
// @route POST /api/cart/add
exports.addToCart = async (req, res) => {
  try {
    const { USER_ID, PRODUCT_ID, QUANTITY } = req.body;

    // Ensure quantity is greater than 0
    if (QUANTITY <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    // Logic to add product to cart
    const newCartItem = await Cart.create({ USER_ID, PRODUCT_ID, QUANTITY });

    // Send success response
    res.status(200).json({
      message: 'Product added to cart',
      data: newCartItem
    });
  } catch (error) {
    console.error(error);
    // Send error response if something goes wrong
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
};
