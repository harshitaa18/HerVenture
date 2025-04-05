const mongoose = require("mongoose");

const entrepreneurSchema = new mongoose.Schema({
  name: String,
  business: String,
  contact: String,
  location: String,
  email: String,
  businessLicense:String,
  aboutBusiness: String,
});

module.exports = mongoose.model("Entrepreneur", entrepreneurSchema);
