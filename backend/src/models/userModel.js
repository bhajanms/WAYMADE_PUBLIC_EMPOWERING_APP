const { DataTypes, DATE } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    USER_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    F_NAME: { type: DataTypes.STRING(100), allowNull: false },
    L_NAME: { type: DataTypes.STRING(100), allowNull: false },
    EMAIL: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    PASSWORD: { type: DataTypes.STRING(200), allowNull: false },
    PHONE: { type: DataTypes.STRING(100), allowNull: false },
    DOB: { type: DataTypes.DATE, allowNull: false },
    GENDER: { type: DataTypes.STRING(10), allowNull: false },
    ADDRESS_LINE1: { type: DataTypes.STRING(500) },
    ADDRESS_LINE2: { type: DataTypes.STRING(500) },
    COUNTRY: { type: DataTypes.STRING(100) },
    STATE: { type: DataTypes.STRING(100) },
    CITY: { type: DataTypes.STRING(100) },
    PINCODE: { type: DataTypes.INTEGER },
    LATITUDE: { type: DataTypes.STRING(100), defaultValue: "0.00" },
    LONGITUDE: { type: DataTypes.STRING(100), defaultValue: "0.00" },
    STATUS: { type: DataTypes.STRING(100), defaultValue: "PENDING" },
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "USER", timestamps: false }
);

module.exports = User;
