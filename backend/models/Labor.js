const mongoose = require("mongoose");

const laborSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skill: String,
  experience: Number,
  expectedSalary: Number,
  location: String,
});

module.exports = mongoose.model("Labor", laborSchema);
