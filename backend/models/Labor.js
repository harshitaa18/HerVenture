const mongoose = require("mongoose");

const laborSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contact: { type: String, required: true },
    business: String,
  experience: Number,
  expectedSalary: Number,
  location: String,
  name:String ,
  email:String,
  skillset: String,
  certifications: String,
});

module.exports = mongoose.models.Labor || mongoose.model("Labor", laborSchema);
