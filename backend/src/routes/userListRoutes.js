const express = require("express");
const userListController = require("../controllers/userListController");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

const router = express.Router();

// @desc List All Users
// @route GET /api/user/list
// router.get("/list", userListController.list);

// @desc Get User by ID
// @route GET /api/user/:id
router.get("/:id", userListController.getUser);

// exports.list = async (req, res) => {
//   try {
//     // Fetch all users, excluding sensitive fields like 'password' and 'email'
//     const users = await User.findAll({
//       attributes: { exclude: ['password', 'email'] }, // Excluding sensitive fields
//     });
    
//     // If no users are found, return a 404
//     if (users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }

//     // Return the list of users
//     res.status(200).json({
//       message: "Users retrieved successfully",
//       users, // Return all users, but without sensitive fields
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request params

    // Find the user by primary key (id), excluding sensitive fields
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'email'] }, // Excluding sensitive fields
    });
    
    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
    res.status(200).json({
      message: "User retrieved successfully",
      user, // Return the user details, without sensitive fields
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = router;
