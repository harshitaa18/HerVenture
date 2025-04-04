const express = require("express");
const Labor = require("../models/Labor");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all skilled labor
router.get("/", async (req, res) => {
  const laborers = await Labor.find();
  res.json(laborers);
});

// Add skilled labor profile
router.post("/", authMiddleware, async (req, res) => {
  const labor = await Labor.create({ userId: req.user.userId, ...req.body });
  res.status(201).json(labor);
});

module.exports = router;
