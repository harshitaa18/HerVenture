const express = require("express");
const Landowner = require("../models/Landowner");

const router = express.Router();

// Get all landowners
router.get("/", async (req, res) => {
  try {
      const landowners = await Landowner.find();
      res.json(landowners);
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ error: "Error fetching data" });
    }
});

// Create new entrepreneur (No auth)
router.post("/", async (req, res) => {
  try {
    const { name, contact, email, landSize, location, ownerAddress, rentOrSell, expectedPayment, preferredBusiness} = req.body;

    const newLandowner = new Landowner({
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

module.exports = router;
