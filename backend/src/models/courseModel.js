const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const Course = sequelize.define(
  "Course",
  {
    COURSE_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NAME: { type: DataTypes.STRING(100) },
    DESCRIPTION: { type: DataTypes.STRING(500) },
    COURSE_URL: { type: DataTypes.STRING(200) },
    USER_ID: { type: DataTypes.INTEGER },
    FEES: { type: DataTypes.INTEGER },
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "COURSE", timestamps: false }
);

Course.belongsTo(User, { foreignKey: "USER_ID" });

module.exports = Course;
