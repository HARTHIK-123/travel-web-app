import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/2.jpg'; // Import the image file
import './Stories.css'; // Import the CSS file for styling

const Stories = () => {
  const [stories, setStories] = useState(() => {
    // Get stored stories from local storage
    const savedStories = localStorage.getItem('stories');
    return savedStories ? JSON.parse(savedStories) : [];
  });
  
  const [storyText, setStoryText] = useState('');
  const [storyImage, setStoryImage] = useState('');
  const [filter, setFilter] = useState('all');

  // Predefined colors
  const colors = [
    'rgba(255, 69, 0, 0.8)', // Red-Orange
    'rgba(0, 191, 255, 0.8)', // Deep Sky Blue
    'rgba(50, 205, 50, 0.8)', // Lime Green
    'rgba(218, 112, 214, 0.8)', // Orchid
    'rgba(255, 165, 0, 0.8)', // Orange
    'rgba(255, 20, 147, 0.8)', // Deep Pink
    'rgba(0, 255, 127, 0.8)', // Spring Green
    'rgba(75, 0, 130, 0.8)',  // Indigo
  ];

  const getAvailableColor = () => {
    // Get a random color that hasn't been used yet
    const availableColors = colors.filter(color => !stories.some(story => story.color === color));
    return availableColors.length > 0 ? availableColors[Math.floor(Math.random() * availableColors.length)] : 'rgba(128, 128, 128, 0.8)'; // Fallback color
  };

  useEffect(() => {
    // Save stories to local storage whenever they change
    localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile); // Create a URL for the selected file
      setStoryImage(fileURL); // Set the file URL to storyImage state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStory = {
      id: stories.length + 1, // Unique ID for each story
      text: storyText,
      image: storyImage,
      category: filter, // Store the category of the story
      color: getAvailableColor(), // Assign a unique color to each story
    };
    setStories((prevStories) => [...prevStories, newStory]); // Append new story to existing stories
    setStoryText(''); // Clear input field
    setStoryImage(''); // Clear image preview
    e.target.reset(); // Reset the form inputs
  };

  // Filter stories based on the selected category
  const filteredStories = filter === 'all' ? stories : stories.filter(story => story.category === filter);

  // Ensure at least one story is shown
  const storiesToShow = filteredStories.length > 0 ? filteredStories : [];

  const storiesStyle = {
    backgroundImage: `url(${backgroundImage})`, // Use the imported image as background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    padding: '20px',
    color: '#fff', // Ensure text is readable
  };

  return (
    <div className="stories" style={storiesStyle}>
      <h1>Your Stories</h1>
      <form className="story-form" onSubmit={handleSubmit}>
        <div className="form-group story-form-card"> {/* Added card class here */}
          <input
            type="text"
            placeholder="Write your story..."
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*" // Allow only image files
            onChange={handleFileChange}
            required
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="adventure">Adventure</option>
            <option value="leisure">Leisure</option>
          </select>
          <button type="submit">Submit Story</button>
        </div>
      </form>

      <h2>Story Gallery</h2>
      <div className="story-gallery">
        {storiesToShow.map((story) => (
          <div key={story.id} className="story-card" style={{ backgroundColor: story.color }}>
            <img src={story.image} alt={`Story ${story.id}`} />
            <h3>Story {story.id}</h3>
            <p>{story.text}</p>
            <p>Category: {story.category}</p>
          </div>
        ))}
      </div>

      {/* Show a message if there are no stories */}
      {storiesToShow.length === 0 && (
        <p>No stories submitted yet. Please add your story!</p>
      )}
    </div>
  );
};

export default Stories;
