const express = require("express");
const Landowner = require("../models/Landowner");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();



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

    const landowner = await Landowner.findOne(query);

    if (!landowner) {
      return res.status(404).json({ error: "Landowner profile not found" });
    }

    res.json(landowner);
  } catch (err) {
    res.status(500).json({ error: "Error fetching landowner profile", details: err.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const allLandowner = await Landowner.find().populate('userId', 'name');
    res.json(allLandowner);
  } catch (err) {
    res.status(500).json({ error: "Error fetching ", details: err.message });
  }
});

module.exports = router;
