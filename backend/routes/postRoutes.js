import express from 'express';
import { createPost, getUserPosts } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.get('/my-posts', authMiddleware, getUserPosts);

export default router;
