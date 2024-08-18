import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Inline styles for the container and links
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: 'url(bg.jpg)', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    animation: 'fadeIn 1s',
    color: '#ffffff', // Ensure text is readable on background
    padding: '20px', // Add padding to avoid content touching edges
  };

  const headerStyle = {
    color: 'black',
    marginBottom: '20px',
    fontSize: '2rem',
  };

  const linkStyle = {
    display: 'block',
    margin: '10px 0',
    padding: '15px 30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '5px',
    color: '#ffffff',
    backgroundColor: 'red',
    transition: 'background-color 0.3s',
  };

  const linkHoverStyle = {
    backgroundColor: 'green',
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = linkStyle.backgroundColor;
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Welcome to Student Grades App</h1>
      </header>
      <div>
        <Link
          to="/admin-login"
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Admin Login
        </Link>
      </div>
      <div>
        <Link
          to="/student-login"
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Student Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
