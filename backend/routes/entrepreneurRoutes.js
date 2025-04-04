const express = require("express");
const Entrepreneur = require("../models/Entrepreneur");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all entrepreneurs
router.get("/", async (req, res) => {
  const entrepreneurs = await Entrepreneur.find();
  res.json(entrepreneurs);
});

// Add entrepreneur profile
router.post("/", authMiddleware, async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.create({
      userId: req.user.userId,
      ...req.body,
    });
    res.status(201).json(entrepreneur);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});


module.exports = router;
