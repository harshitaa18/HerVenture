const express = require("express");
const { createPost, getAllPosts, getPostsByUser, deletePost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/user/:id", authMiddleware, getPostsByUser);
router.delete("/:id", authMiddleware, deletePost);
router.get("/", getAllPosts);

module.exports = router;
