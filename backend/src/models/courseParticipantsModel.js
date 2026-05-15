const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./courseModel");
const User = require("./userModel");
const Payment = require("./paymentModel");

const CourseParticipants = sequelize.define(
  "CourseParticipants",
  {
    
    COURSE_PARTICIPANTS_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    COURSE_ID: { type: DataTypes.INTEGER, allowNull: false },
    USER_ID: { type: DataTypes.INTEGER, allowNull: false },
    PAYMENT_ID: { type: DataTypes.INTEGER },
    CREATED_ON: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "COURSE_PARTICIPANTS", timestamps: false }
);

CourseParticipants.belongsTo(Course, { foreignKey: "COURSE_ID" });
CourseParticipants.belongsTo(User, { foreignKey: "USER_ID" });
CourseParticipants.belongsTo(Payment, { foreignKey: "PAYMENT_ID" });

module.exports = CourseParticipants;
