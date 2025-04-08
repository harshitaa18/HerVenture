const mongoose = require("mongoose");

const entrepreneurSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contact: { type: String, required: true },
  name: String,
  business: String,
  location: String,
  email: String,
  businessLicense: String,
  aboutBusiness: String,
});

module.exports = mongoose.models.Entrepreneur || mongoose.model("Entrepreneur", entrepreneurSchema);
