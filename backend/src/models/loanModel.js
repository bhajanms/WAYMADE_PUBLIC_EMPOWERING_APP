const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const Loans = sequelize.define(
  "Loans",
  {
    LOAN_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    PAN_NUMBER: {type: DataTypes.INTEGER, allowNull: false },
    ACCOUNT_NO: {type: DataTypes.INTEGER, allowNull: false },
    PAN_IMAGE: { type: DataTypes.STRING(200),allowNull: false },
    BANK: { type: DataTypes.STRING(100) },
    IFSC: { type: DataTypes.STRING(100) },
    USER_ID: { type: DataTypes.INTEGER },
    

  },
  { tableName: "LOANS", timestamps: false }
);

Loans.belongsTo(User, { foreignKey: "USER_ID" });


module.exports = Loans;
