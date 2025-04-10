import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { type, title, description } = req.body;
    const { _id, role } = req.user;

    const post = new Post({
      userId: _id,
      role,
      type,
      title,
      description,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post." });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};
