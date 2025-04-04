const mongoose = require("mongoose");

const landownerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  landSize: String,
  expectedPayment: Number,
  location: String,
  rentOrSell: String,
});

module.exports = mongoose.model("Landowner", landownerSchema);
