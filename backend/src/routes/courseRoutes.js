const express = require("express");
const { add } = require("../controllers/courseController");
const { body } = require("express-validator");

const router = express.Router();

// Register Route
router.post(
  "/add",
  [
    body("NAME").notEmpty().withMessage("Name is required"),
    body("DESCRIPTION").notEmpty().withMessage("Description is required"),
    body("COURSE_URL").notEmpty().withMessage("course url is required"),
    body("USER_ID").notEmpty().withMessage("user id is required"),
    body("FEES").notEmpty().withMessage("fees is required"),
  

  ],
  add
);

module.exports = router;
