const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["entrepreneur", "landowner", "labor", "supplier"],
    required: true,
  },
  title: String,
  description: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
comments: [
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
],

});

module.exports = mongoose.model("Post", postSchema);
