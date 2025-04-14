// routes/entrepreneurRoute.js
const express = require("express");
const router = express.Router();
const Entrepreneur = require("../models/Entrepreneur");
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware
const mongoose = require("mongoose");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { businessLicense, aboutBusiness, contact, location } = req.body;
    console.log("Creating entrepreneur with data:", req.body);
    const entrepreneur = await Entrepreneur.create({
      userId: req.user._id,
      name: req.user.name, // from token
      email: req.user.email, // from token
      business: businessLicense,
      aboutBusiness,
      contact,
      location,
    });

    res.status(201).json(entrepreneur);
  } catch (err) {
    res.status(500).json({ error: "Failed to create profile", details: err.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  console.log(req.params.id, typeof req.params.id);
  try {
    const entrepreneur = await Entrepreneur.findOne({ userId: req.params.id
    });

    if (!entrepreneur) {
      console.log("Sorry no one found")
      return res.status(404).json({ error: "Landowner profile not found" });
    }

    res.json(entrepreneur);
  } catch (err) {
    console.log("Error here")
    res.status(500).json({ error: "Error fetching landowner profile", details: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allEntrepreneurs = await Entrepreneur.find().populate('userId', 'name');
    res.json(allEntrepreneurs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching entrepreneurs", details: err.message });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const allEntrepreneurs = await Entrepreneur.find().populate('userId', 'name');
    res.json(allEntrepreneurs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching entrepreneurs", details: err.message });
  }
});


module.exports = router;