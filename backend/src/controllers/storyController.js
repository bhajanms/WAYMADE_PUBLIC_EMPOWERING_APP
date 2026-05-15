const Story = require("../models/storyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

// @route POST /api/story/add
exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      SELLER_ID,
      MEDIA,
      STATUS

    } = req.body;

    const newStory = await Story.create({
        SELLER_ID,
        MEDIA,
        STATUS,
    
    });

    res.status(201).json({
      message: "story added successfully",
      story: newStory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


