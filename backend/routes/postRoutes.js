const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,          // ✅ Get a single post by ID
  getPostsByUser,
  deletePost,
  likePost,             // ✅ Like a post
  commentOnPost         // ✅ Add a comment to a post
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a post (auth required)
router.post("/", authMiddleware, createPost);

// Get all posts (public)
router.get("/", getAllPosts);

// Get a specific post by ID (public)
router.get("/:id", getPostById);

// Get posts by a user (auth required)
router.get("/user/:id", authMiddleware, getPostsByUser);

// Delete a post (auth required)
router.delete("/:id", authMiddleware, deletePost);

// Like a post (auth required)
router.post("/:id/like", authMiddleware, likePost);

// Comment on a post (auth required)
router.post("/:id/comment", authMiddleware, commentOnPost);

module.exports = router;
