const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});

module.exports = router;
