import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Assuming you have a CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Student Grades App</h1>
      </header>
      <div className="home-links">
        <Link to="/admin-login" className="home-link">
          Admin Login
        </Link>
        <Link to="/student-login" className="home-link">
          Student Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
