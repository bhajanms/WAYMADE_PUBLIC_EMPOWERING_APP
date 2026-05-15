const Wishlist = require("../models/wishlistModel");  // Your Wishlist model
const Product = require("../models/productModel");    // Your Product model
const User = require("../models/userModel");          // Your User model

exports.list = async (req, res) => {
  try {
    const { USER_ID } = req.params;  // Accessing the USER_ID from the URL parameter

    // Check if user exists
    const user = await User.findByPk(USER_ID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all wishlist items for the user
    const wishlistItems = await Wishlist.findAll({
      where: { USER_ID },
    });

    if (wishlistItems.length === 0) {
      return res.status(404).json({ message: "No products in wishlist" });
    }

    // Fetch product details for each wishlist item
    const products = [];
    for (const item of wishlistItems) {
      const product = await Product.findByPk(item.PRODUCT_ID);
      if (product) {
        products.push(product);
      }
    }

    // Return the list of products in the wishlist
    res.status(200).json({
      message: "Products in wishlist",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
