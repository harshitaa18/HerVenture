const express = require("express");
const Entrepreneur = require("../models/Entrepreneur");

const router = express.Router();

// Get all entrepreneurs
router.get("/", async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.json(entrepreneurs);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Create new entrepreneur (No auth)
router.post("/", async (req, res) => {
  try {
    const { name, business, contact, location, email, businessLicense, aboutBusiness } = req.body;

    const newEntrepreneur = new Entrepreneur({
      name,
      business,
      contact,
      location,
      email,
      businessLicense,
      aboutBusiness,
    });

    await newEntrepreneur.save();
    res.status(201).json(newEntrepreneur);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

module.exports = router;
