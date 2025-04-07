const express = require("express");
const Landowner = require("../models/Landowner");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// Get single landowner profile (protected)



// Create new landowner profile (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { contact, landSize, location, rentOrSell, expectedPayment, preferredBusiness } = req.body;
    console.log("Creating landowner with data:", req.body);
    const newLandowner = await Landowner.create({
      userId: req.user._id,
      name: req.user.name,
      contact,
      email: req.user.email,
      landSize,
      location,
      rentOrSell,
      expectedPayment,
      preferredBusiness,
    });

    res.status(201).json(newLandowner);
  } catch (err) {
    res.status(500).json({ error: "Failed to create profile", details: err.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const landowner = await Landowner.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    console.log("Fetching landowner for userId:", req.params.id);

    if (!landowner) {
      return res.status(404).json({ error: "Landowner profile not found" });
    }

    res.json(landowner);
  } catch (err) {
    res.status(500).json({ error: "Error fetching landowner profile", details: err.message });
  }
});

module.exports = router;
