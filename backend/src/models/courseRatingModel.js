const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./courseModel");
const User = require("./userModel");

const Courserating = sequelize.define(
  " Courserating",
  {
    COURSE_RATING_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    COURSE_ID: { type: DataTypes.INTEGER},
    RATING: { type: DataTypes.INTEGER },
    REVIEW: { type: DataTypes.STRING(500) },
    USER_ID: { type: DataTypes.INTEGER},
  },
  { tableName: "COURSE_RATING", timestamps: false }
);

Courserating.belongsTo(Course, { foreignKey: "COURSE_ID" });
Courserating.belongsTo(User, { foreignKey: "USER_ID" });

module.exports = Courserating;
