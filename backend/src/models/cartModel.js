const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");
const Seller = require("./sellerModel");
const Product = require("./productModel");

const Cart = sequelize.define(
  "cart",
  {
    CART_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    USER_ID: { type: DataTypes.INTEGER },
    PRODUCT_ID: { type: DataTypes.INTEGER },
    QUANTITY: { type: DataTypes.INTEGER },
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "CART", timestamps: false }
);

Cart.belongsTo(User, { foreignKey: "USER_ID" });
Cart.belongsTo(Seller, { foreignKey: "SELLER_ID" });
Cart.belongsTo(Product, { foreignKey: "PRODUCT_ID" });

module.exports = Cart;
