const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const courseRoutes = require("./routes/courseRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRatingRoutes = require("./routes/productRatingRoutes");
const productListRoutes= require("./routes/productListRoutes");
const productListUserRoutes= require("./routes/productListUserRoutes");
const storyRoutes= require("./routes/storyRoutes");
const userUpdateRoutes= require("./routes/userUpdateRoutes");
const userListRoutes= require("./routes/userListRoutes");
const sellerListRoutes= require("./routes/sellerListRoutes");
const wishlistRoutes= require("./routes/wishlistRoutes");
const wishlistListRoutes= require("./routes/wishlistListRoutes");
const cartListRoutes= require("./routes/cartListRoutes");
const cartRoutes= require("./routes/cartRoutes");
const courseListRoutes= require("./routes/courseListRoutes");

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/productrating", productRatingRoutes );
app.use("/api/product",productListRoutes);
app.use("/api/product",productListRoutes);
app.use("/api/course",courseListRoutes);
app.use("/api/story",storyRoutes);
app.use("/api/user",userUpdateRoutes);
app.use("/api/user",userListRoutes);
app.use("/api/product",productListUserRoutes);
app.use("/api/seller", sellerListRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/wishlist", wishlistListRoutes);
app.use("/api/cart", cartListRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
