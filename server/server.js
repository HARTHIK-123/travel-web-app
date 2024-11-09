import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';  
import storyRoutes from './routes/stories.js';
import userPostRoutes from './routes/userPosts.js';

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://travel-web-app-navy.vercel.app', // Allow only this specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods as needed
    credentials: true // Enable if you're handling cookies or sessions
}));

// Database connection
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connection successful'))
    .catch(error => console.log(`MongoDB connection failed: ${error}`));

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/stories', storyRoutes);
app.use('/api/userPosts', userPostRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
