const express = require("express");
const courseListController = require("../controllers/courseListController");
const Course = require("../models/productModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

const router = express.Router();

// @desc List All Products
// @route GET /api/course/list
router.get("/list", courseListController.list);

exports.list = async (req, res) => {
    try {
    const courses = await Course.findAll();
    res.status(200).json({
      message: "courses retrieved successfully",
      courses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = router;