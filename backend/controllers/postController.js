// controllers/postController.js
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, description, tags } = req.body;
  const user = req.user; // from JWT middleware

  try {
    const newPost = await Post.create({
      userId: user._id,
      role: user.role,
      title,
      description,
      tags
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: "Error creating post" });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user posts" });
  }
};

export const deletePost = async (req, res) => {
  const user = req.user;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name role");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};
