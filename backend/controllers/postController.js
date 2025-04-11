const Post = require("../models/Post");
const User = require("../models/User");

// Create a new post
const createPost = async (req, res) => {
  const { title, description, tags } = req.body;
  const user = req.user;

  try {
    const newPost = await Post.create({
      userId: user._id,
      role: user.role,
      title,
      description,
      tags,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: "Error creating post" });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name role email")
    .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Get all posts by a specific user
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user posts" });
  }
};

// Like or unlike a post
const likePost = async (req, res) => {
  const userId = req.user._id;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const liked = post.likes.includes(userId);
    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate("userId", "name")
      .lean();

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Error liking/unliking post" });
  }
};

// Comment on a post
const commentOnPost = async (req, res) => {
  const userId = req.user._id;
  const { text } = req.body;

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({
      userId,
      userName: user.name,
      text,
      createdAt: new Date(),
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error adding comment" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const user = req.user;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
};

// Get single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsByUser,
  likePost,
  commentOnPost,
  deletePost,
  getPostById,
};
