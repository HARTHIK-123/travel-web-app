import React from 'react';
import backgroundImage from '../assets/1.jpg'; // Import the image file
import './Dashboard.css'; // Import the CSS file for other styles

const Dashboard = () => {
  const dashboardStyle = {
    backgroundImage: `url(${backgroundImage})`, // Use the imported image
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: '#fff', // Ensure text visibility
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <div className="dashboard" style={dashboardStyle}>
      <div className="content-box">
        <h1>Welcome to Your Travel Journal</h1>
        <p>
          This application allows you to document your travel experiences, share stories, and connect with fellow travelers. Explore, submit, and inspire!
        </p>
      </div>

      <div className="overview-box">
        <h2>Project Overview</h2>
        <p>The Travel Journal Application is designed to help users:</p>
        <ul>
          <li><strong>Document Travel Experiences:</strong> Submit your travel stories and images.</li>
          <li><strong>Manage Travel Expenses:</strong> Track your spending and budgeting with the Wallet page.</li>
          <li><strong>Connect with Others:</strong> Communicate and share insights through the Messages page.</li>
          <li><strong>Customize Your Experience:</strong> Personalize your settings and profile through the Config page.</li>
        </ul>
      </div>

      <div className="pages-box">
        <h2>Pages in the Application</h2>
        <ul>
          <li><strong>Dashboard:</strong> Overview of your travel journey and navigation to different features.</li>
          <li><strong>Stories:</strong> Submit and view travel stories with images.</li>
          <li><strong>Wallet:</strong> Track your travel expenses and budgeting.</li>
          <li><strong>Messages:</strong> Communicate with other users in the application.</li>
          <li><strong>Config:</strong> Manage your profile and settings for a personalized experience.</li>
        </ul>
      </div>

      <div className="quotes-container">
        <div className="quote-card" style={{ backgroundColor: '#FFB6C1' }}>
          "Travel is the only thing you buy that makes you richer."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#FFD700' }}>
          "The world is a book and those who do not travel read only one page."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#90EE90' }}>
          "Life is short and the world is wide."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#87CEEB' }}>
          "To travel is to live."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#FF7F50' }}>
          "Traveling – it leaves you speechless, then turns you into a storyteller."
        </div>
      </div>

      {/* Add the footer at the bottom */}
      <div className="footer">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#">Careers</a></li>
            <li><a href="#">About Travel Journal</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Travel Journal Devices</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="#">Manage on Travel Journal</a></li>
            <li><a href="#">Manage on Travel Journal Business</a></li>
            <li><a href="#">Manage Your Apps on Travel Journal</a></li>
            <li><a href="#">Become an Affiliate</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Travel Journal Tracks</h3>
          <ul>
            <li><a href="#">Travel Journal Rewards Visa</a></li>
            <li><a href="#">Travel Journal Store Card</a></li>
            <li><a href="#">Credit Card Marketplace</a></li>
            <li><a href="#">Reload Your Balance</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Travel Journal Tracks</a></li>
            <li><a href="#">Travel Journal Trip Costs</a></li>
            <li><a href="#">Travel Journal Prime</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <div>Travel Journal &copy; 2024</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
