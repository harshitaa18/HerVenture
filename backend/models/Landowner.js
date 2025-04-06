// models/Landowner.js
const mongoose = require("mongoose");

const landownerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to authenticated user
  landSize: String,
  expectedPayment: Number,
  location: String,
  rentOrSell: String,
  name: String,
  contact: String,
  email: String,
  ownerAddress: String,
  preferredBusiness: String,
});

module.exports = mongoose.model("Landowner", landownerSchema);
