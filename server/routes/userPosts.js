// routes/userPosts.js
import express from 'express';
import UserPost from '../Schema/UserPost.js';

const router = express.Router();

// GET all user posts (or filtered by category)
router.get('/', async (req, res) => {
  const { category } = req.query;

  try {
    const userPosts = category 
      ? await UserPost.find({ category }) 
      : await UserPost.find();  // If no category, return all posts
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// POST a new user post
router.post('/', async (req, res) => {
  const { text, image, category, color } = req.body;

  try {
    const newPost = new UserPost({ text, image, category, color });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error saving post', error });
  }
});

export default router;
