const mongoose = require("mongoose");

const laborSchema = new mongoose.Schema({
  experience: Number,
  expectedSalary: Number,
  location: String,
  name:String ,
  contact: String,
  email:String,
  skillset: String,
  certifications: String,
});

module.exports = mongoose.model("Labor", laborSchema);
