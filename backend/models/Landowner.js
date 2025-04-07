// models/Landowner.js
const mongoose = require("mongoose");

const landownerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to authenticated user
  landSize: String,
  expectedPayment: Number,
  location: String,
  rentOrSell: String,
  name: String,
  contact: { type: String, required: true },
  email: String,
  ownerAddress: String,
  preferredBusiness: String,
});

module.exports = mongoose.models.Landowner || mongoose.model("Landowner", landownerSchema);
