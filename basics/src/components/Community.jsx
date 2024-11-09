import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/3.jpg';

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newStory, setNewStory] = useState('');
  const [stories, setStories] = useState([]);

  const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D9BF77', '#A8D8EA', '#A3DFF7', '#FFE156'];

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    // Fetch stories from backend
    axios.get(`${backendURL}/api/stories`)
      .then(response => setStories(response.data))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleLike = (id) => {
    axios.patch(`${backendURL}/api/stories/${id}/like`)
      .then(response => {
        setStories(stories.map(story => story.id === id ? response.data : story));
      })
      .catch(error => console.error('Error liking story:', error));
  };

  const handleCommentSubmit = (id, comment) => {
    axios.post(`${backendURL}/api/stories/${id}/comment`, { text: comment })
      .then(response => {
        setStories(stories.map(story => story.id === id ? response.data : story));
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  const handleNewStorySubmit = (e) => {
    e.preventDefault();
    if (newStory.trim()) {
      axios.post(`${backendURL}/api/stories`, { user: 'You', text: newStory })
        .then(response => {
          setStories([response.data, ...stories]);
          setNewStory('');
        })
        .catch(error => console.error('Error posting story:', error));
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
      }}
    >
      <header style={{ color: 'white' }}>
        <h1>Travel Journal Community</h1>
      </header>

      {/* Input Section */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <input
          type="text"
          placeholder="Search users or stories..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Share your travel story..."
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', height: '100px' }}
        />
        <button 
          onClick={handleNewStorySubmit} 
          style={{
            backgroundColor: '#007BFF', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Post Story
        </button>
      </div>

      {/* Stories Display Section */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {stories.filter(story => 
          story.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
          story.text.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((story, index) => (
          <div key={story._id} style={{ backgroundColor: colors[index % colors.length], padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <h3>{story.user}</h3>
            <p>{story.text}</p>
            <div>
              <button onClick={() => handleLike(story._id)}>Like ({story.likes})</button>
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommentSubmit(story._id, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </div>
            <div>
              <p>Comments: {story.comments.length}</p>
              {story.comments.map((comment, idx) => (
                <p key={idx}><strong>Comment:</strong> {comment.text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
