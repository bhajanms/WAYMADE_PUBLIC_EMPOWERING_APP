const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");
const Seller = require("./sellerModel");
const Payment = require("./paymentModel");

const Order = sequelize.define(
  "Order",
  {
    ORDER_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    USER_ID: { type: DataTypes.INTEGER },
    DATE: { type: DataTypes.DATE },
    AMOUNT: { type: DataTypes.INTEGER },
    STATUS: { type: DataTypes.STRING(100) },
    SELLER_ID: { type: DataTypes.INTEGER },
    MODIFIED_ON: { type: DataTypes.DATE },
    PAYMENT_ID: { type: DataTypes.INTEGER },
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "ORDER", timestamps: false }
);

Order.belongsTo(User, { foreignKey: "USER_ID" });
Order.belongsTo(Seller, { foreignKey: "SELLER_ID" });
Order.belongsTo(Payment, { foreignKey: "PAYMENT_ID" });

module.exports = Order;
