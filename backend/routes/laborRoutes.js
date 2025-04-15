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
  const { id } = req.params;

  try {
    const query = {
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null },
        { userId: mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null }
      ]
    };

    // Remove nulls from query if ObjectId conversion failed
    query.$or = query.$or.filter(q => q[Object.keys(q)[0]] !== null);

    const labor = await Labor.findOne(query);

    if (!labor) {
      return res.status(404).json({ error: "labor profile not found" });
    }

    res.json(labor);
  } catch (err) {
    res.status(500).json({ error: "Error fetching labor profile", details: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allLabor = await Labor.find().populate('userId', 'name');
    res.json(allLabor);
  } catch (err) {
    res.status(500).json({ error: "Error fetching entrepreneurs", details: err.message });
  }
});

module.exports = router;
