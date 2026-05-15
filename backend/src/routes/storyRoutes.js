const express = require("express");
const { add } = require("../controllers/storyController");
const { body } = require("express-validator");

const router = express.Router();

// Register Route
router.post(
  "/add",
  [
    body("SELLER_ID").notEmpty().withMessage("Seller ID is required"),
    body("MEDIA").notEmpty().withMessage("Media is required"),
    body("STATUS").notEmpty().withMessage("Status is required"),
  ],
  add
);

module.exports = router;
