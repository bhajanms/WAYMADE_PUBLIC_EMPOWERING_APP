const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    
    PAYMENT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    TRANSACTION_ID: { type: DataTypes.INTEGER },
    PAYMENT_TYPE: {type: DataTypes.STRING(500)},
    AMOUNT: { type: DataTypes.INTEGER },
    PAYMENT_FROM: { type: DataTypes.STRING(500) },
    PAYMENT_TO: { type: DataTypes.STRING(500) },
  },
  { tableName: "PAYMENT", timestamps: false }
);

module.exports = Payment;
