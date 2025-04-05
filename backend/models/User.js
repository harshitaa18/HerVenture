const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["entrepreneur", "landowner", "skilled labor", "supplier"],
    required: true,
  },
});

module.exports = mongoose.models.User ||  mongoose.model("User", userSchema);
