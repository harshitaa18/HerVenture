const mongoose = require("mongoose");

const landownerSchema = new mongoose.Schema({
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
