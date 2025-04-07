const express = require("express");
const Landowner = require("../models/Landowner");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all landowners (public)
router.get("/", async (req, res) => {
  try {
    const landowners = await Landowner.find();
    res.json(landowners);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Create new landowner profile (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, contact, email, landSize, location, ownerAddress, rentOrSell, expectedPayment, preferredBusiness } = req.body;

    // ✅ Check if profile already exists
    const existingProfile = await Landowner.findOne({ userId: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    const newLandowner = new Landowner({
      userId: req.user._id,
      name,
      contact,
      email,
      landSize,
      location,
      ownerAddress,
      rentOrSell,
      expectedPayment,
      preferredBusiness,
    });

    await newLandowner.save();
    res.status(201).json(newLandowner);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// Get landowner profile by user ID (protected)
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const profile = await Landowner.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
