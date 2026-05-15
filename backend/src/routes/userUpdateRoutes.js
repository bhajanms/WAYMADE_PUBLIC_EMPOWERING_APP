const express = require("express");
const { update } = require("../controllers/userUpdateController");
const { body } = require("express-validator");

const router = express.Router();

// Update User Route
router.put(
  "/update/:id", // Add :id to match the controller
  [
    body("F_NAME").notEmpty().withMessage("First name is required"),
    body("L_NAME").notEmpty().withMessage("Last name is required"),
    body("PHONE").notEmpty().withMessage("Invalid phone number format"),
  ],
  update
);

module.exports = router;
