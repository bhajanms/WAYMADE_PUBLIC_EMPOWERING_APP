const Course = require("../models/courseModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @desc List All Products
// @route GET /api/course/list
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
