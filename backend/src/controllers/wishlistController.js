const Wishlist = require('../models/wishlistModel'); // Assuming the Wishlist model is defined

// @desc Add a product to the wishlist
// @route POST /api/wishlist/add
exports.addToWishlist = async (req, res) => {
  try {
    const { USER_ID, PRODUCT_ID } = req.body;

    // Logic to add product to wishlist
    const newWishlistItem = await Wishlist.create({ USER_ID, PRODUCT_ID });

    // Send success response
    res.status(200).json({
      message: 'Product added to wishlist',
      data: newWishlistItem
    });
  } catch (error) {
    console.error(error);
    // Send error response if something goes wrong
    res.status(500).json({ message: 'Failed to add product to wishlist' });
  }
};
