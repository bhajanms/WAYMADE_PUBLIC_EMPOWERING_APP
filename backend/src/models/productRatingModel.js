const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./productModel");
const User = require("./userModel");

const Productrating = sequelize.define(
  "Productrating",
  {
    
    PRODUCT_RATING_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    PRODUCT_ID: { type: DataTypes.INTEGER },
    RATING: { type: DataTypes.INTEGER },
    REVIEW: { type: DataTypes.STRING(500) },
    USER_ID: { type: DataTypes.INTEGER },
  },
  { tableName: "PRODUCT_RATING", timestamps: false }
);

Productrating.belongsTo(Product, { foreignKey: "PRODUCT_ID" });
Productrating.belongsTo(User, { foreignKey: "USER_ID" });

module.exports = Productrating;
