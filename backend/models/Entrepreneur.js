const mongoose = require("mongoose");

const entrepreneurSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  business: String,
  contact: String,
  location: String,
});

module.exports = mongoose.model("Entrepreneur", entrepreneurSchema);
