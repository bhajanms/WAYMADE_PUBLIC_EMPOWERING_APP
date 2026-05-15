const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const Seller = sequelize.define(
  "Seller",
  {
    SELLER_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COMPANY_NAME: { type: DataTypes.STRING(100) },
    DESCRIPTION: { type: DataTypes.STRING(500) },
    PICTURES: { type: DataTypes.STRING(500) },
    USER_ID: { type: DataTypes.INTEGER,unique: true},
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "SELLER", timestamps: false }
);

Seller.belongsTo(User, { foreignKey: "USER_ID" });

module.exports = Seller;