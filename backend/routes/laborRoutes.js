const express = require("express");
const Labor = require("../models/Labor");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware
const mongoose = require("mongoose");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name,
      contact,
      email,
      expectedSalary,
      skillset,
      certifications,
      location,
      experience,
      workSamples, } = req.body;

    const newLabour = await Labor.create({
      userId: req.user._id,
      name: req.user.name, // from token
      email: req.user.email,
      contact,
      expectedSalary,
      skillset,
      certifications,
      location,
      experience,
      workSamples,
    });
    res.status(201).json(newLabour);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const labor = await Labor.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    console.log("Fetching landowner for userId:", req.params.id);

    if (!labor) {
      return res.status(404).json({ error: "Landowner profile not found" });
    }

    res.json(labor);
  } catch (err) {
    res.status(500).json({ error: "Error fetching landowner profile", details: err.message });
  }
});

module.exports = router;
