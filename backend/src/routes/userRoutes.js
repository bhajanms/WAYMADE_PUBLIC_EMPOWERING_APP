const express = require("express");
const { register, login } = require("../controllers/userController");
const { body } = require("express-validator");

const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    body("F_NAME").notEmpty().withMessage("First name is required"),
    body("L_NAME").notEmpty().withMessage("Last name is required"),
    body("EMAIL").isEmail().withMessage("Valid email is required"),
    body("PASSWORD")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("PHONE")
      .isMobilePhone("en-IN")
      .withMessage("Invalid phone number format"),
    body("GENDER")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Gender must be 'Male' or 'Female' or 'other'"),
    body("PINCODE")
      .isNumeric()
      .withMessage("Pincode must be a number")
      .isLength({ min: 6, max: 6 })
      .withMessage("Pincode must be exactly 6 digits"),
  ],
  register
);

// Login Route
router.post(
  "/login",
  [
    body("EMAIL").isEmail().withMessage("Valid email is required"),
    body("PASSWORD").notEmpty().withMessage("Password is required"),
  ],
  login
);

module.exports = router;
