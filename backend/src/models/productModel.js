const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Seller = require("./sellerModel");

const Product = sequelize.define(
  "Product",
  {
    PRODUCT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    NAME: { type: DataTypes.STRING(200), allowNull: false },
    DESCRIPTION: { type: DataTypes.STRING(500) },
    PRICE: { type: DataTypes.INTEGER, allowNull: false },
    QUANTITY: { type: DataTypes.INTEGER },
    PICTURES: { type: DataTypes.STRING(500) },
    LIKE: { type: DataTypes.STRING(1000) },
    LIKE_COUNT: { type: DataTypes.INTEGER },
    SELLER_ID: { type: DataTypes.INTEGER, allowNull: false  },
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  },
  { tableName: "PRODUCT", timestamps: false }
);


Product.belongsTo(Seller, { foreignKey: "SELLER_ID" });

module.exports = Product;
