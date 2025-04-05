const express = require("express");
const Labor = require("../models/Labor");

const router = express.Router();

// Get all skilled labor
router.get("/", async (req, res) => {
  try {
      const laborers = await Labor.find();
      res.json(laborers);
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ error: "Error fetching data" });
    }
});

router.post("/", async (req, res) => {
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

    const newLabour = new Labor({
      name,
      contact,
      email,
      expectedSalary,
      skillset,
      certifications,
      location,
      experience,
      workSamples,
    });

    await newLabour.save();
    res.status(201).json(newLabour);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

module.exports = router;
