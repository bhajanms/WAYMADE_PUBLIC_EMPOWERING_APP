const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Seller = require("./sellerModel");
const User = require("./userModel");

const Sellerrating = sequelize.define(
  "Sellerrating",
  {
    
    SELLER_RATING_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    SELLER_ID: { type: DataTypes.INTEGER},
    RATING: { type: DataTypes.INTEGER },
    REVIEW: { type: DataTypes.STRING(500) },
    USER_ID: { type: DataTypes.INTEGER},
  },
  { tableName: "SELLER_RATING", timestamps: false }
);

Sellerrating.belongsTo(Seller, { foreignKey: "SELLER_ID" });
Sellerrating.belongsTo(User, { foreignKey: "USER_ID" });

module.exports = Sellerrating;
