const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.USER_ID, email: user.EMAIL },
    process.env.JWT_SECRET,
    {
      // expiresIn: "1h", // Optional expiry time for the token
    }
  );
};

// @desc Register User
// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      F_NAME,
      L_NAME,
      EMAIL,
      PASSWORD,
      PHONE,
      DOB,
      GENDER,
      ADDRESS_LINE1,
      ADDRESS_LINE2,
      COUNTRY,
      STATE,
      CITY,
      PINCODE,
      LATITUDE,
      LONGITUDE,
    } = req.body;

    const existingUser = await User.findOne({ where: { EMAIL } });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    const newUser = await User.create({
      F_NAME,
      L_NAME,
      EMAIL,
      PASSWORD: hashedPassword,
      PHONE,
      DOB,
      GENDER,
      ADDRESS_LINE1,
      ADDRESS_LINE2,
      COUNTRY,
      STATE,
      CITY,
      PINCODE,
      LATITUDE,
      LONGITUDE,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(newUser),
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Login User
// @route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { EMAIL, PASSWORD } = req.body;
    const user = await User.findOne({ where: { EMAIL } });

    if (!user || !(await bcrypt.compare(PASSWORD, user.PASSWORD))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Fetch seller data related to the user
    const seller = await Seller.findOne({ where: { USER_ID: user.USER_ID } });

    // Include seller_id in the response
    res.json({
      message: "Login successful",
      token: generateToken(user),
      data: {
        ...user.toJSON(), // Converts the user object to a plain JSON object
        seller_id: seller ? seller.SELLER_ID : null, // Include seller_id if seller exists, otherwise null
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
