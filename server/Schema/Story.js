import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const storySchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [commentSchema]
}, { timestamps: true });

export default mongoose.model('Story', storySchema);
