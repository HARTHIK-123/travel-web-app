import express from 'express';
import Story from '../Schema/Story.js';

const router = express.Router();

// Get all stories
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving stories', error });
    }
});

// Add a new story
router.post('/', async (req, res) => {
    const { user, text } = req.body;
    try {
        const newStory = new Story({ user, text });
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        res.status(500).json({ message: 'Error adding story', error });
    }
});

// Like a story
router.patch('/:id/like', async (req, res) => {
    const { id } = req.params;
    try {
        const story = await Story.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        res.json(story);
    } catch (error) {
        res.status(500).json({ message: 'Error liking story', error });
    }
});

// Add a comment to a story
router.post('/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const story = await Story.findById(id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        
        story.comments.push({ text });
        await story.save();
        
        res.json(story);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
});

export default router;
