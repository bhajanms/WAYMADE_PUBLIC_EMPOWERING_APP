const express = require("express");
const { add } = require("../controllers/productRatingController");
const { body } = require("express-validator");

const router = express.Router();

// Register Route
router.post(
  "/add",
  [
    body("PRODUCT_ID").notEmpty().withMessage("Id is required"),
    body("RATING").notEmpty().withMessage(""),
    body("REVIEW").notEmpty().withMessage(""),
    body("USER_ID").notEmpty().withMessage(""),
  ],
  add
);

module.exports = router;
