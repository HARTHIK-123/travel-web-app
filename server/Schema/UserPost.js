// models/UserPost.js
import mongoose from 'mongoose';

const userPostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String, required: true }, // Store the image URL or path
  category: { type: String, enum: ['all', 'adventure', 'leisure'], default: 'all' },
  color: { type: String, required: true }, // Color for the post card
}, { timestamps: true });

const UserPost = mongoose.model('UserPost', userPostSchema);

export default UserPost;
