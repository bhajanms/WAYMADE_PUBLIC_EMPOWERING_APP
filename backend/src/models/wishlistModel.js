const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");
const Seller = require("./sellerModel");
const Product = require("./productModel");

const Wishlist = sequelize.define(
  "Wishlist",
  {
    WISHLIST_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    USER_ID: { type: DataTypes.INTEGER },
    PRODUCT_ID: { type: DataTypes.INTEGER },
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "WISHLIST", timestamps: false }
);

Wishlist.belongsTo(User, { foreignKey: "USER_ID" });
Wishlist.belongsTo(Seller, { foreignKey: "SELLER_ID" });
Wishlist.belongsTo(Product, { foreignKey: "PRODUCT_ID" });

module.exports = Wishlist;
