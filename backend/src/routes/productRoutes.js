const express = require("express");
const { add } = require("../controllers/productController");
const { body } = require("express-validator");

const router = express.Router();

// Register Route
router.post(
  "/add",
  [
    body("NAME").notEmpty().withMessage("Name is required"),
    body("PRICE").notEmpty().withMessage("Price is required"),
    body("SELLER_ID").notEmpty().withMessage("SELLER_ID is required"),
    // body("SELLER_ID").notEmpty().withMessage("SELLER_ID is required"),
  ],
  add
);

module.exports = router;
