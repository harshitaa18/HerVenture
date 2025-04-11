import mongoose from "mongoose";

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
  title: String,          // Short summary
  description: String,    // Full content of the post
  tags: [String],         // e.g., ["electrician", "available", "urgent"]
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

export default mongoose.model("Post", postSchema);
