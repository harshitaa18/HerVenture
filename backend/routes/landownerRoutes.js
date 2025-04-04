const express = require("express");
const Landowner = require("../models/Landowner");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all landowners
router.get("/", async (req, res) => {
  const landowners = await Landowner.find();
  res.json(landowners);
});

// Add landowner profile
router.post("/", authMiddleware, async (req, res) => {
  const landowner = await Landowner.create({ userId: req.user.userId, ...req.body });
  res.status(201).json(landowner);
});

module.exports = router;
