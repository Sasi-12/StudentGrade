import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const StudentGrades = () => {
  const [grades, setGrades] = useState({
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
    subject5: '',
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setGrades({ ...grades, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await axios.post('http://localhost:5000/api/convert', {
        scores: Object.values(grades).map(Number),
      });
      console.log("Submitted Grades Results:", response.data.results);
    } catch (error) {
      console.error('Error submitting grades', error);
    }
  };

  const handleFetchResults = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching results', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Enter Your Grades</h1>
      </header>
      <form>
        {['subject1', 'subject2', 'subject3', 'subject4', 'subject5'].map((subject, index) => (
          <div key={index}>
            <label>Subject {index + 1}:</label>
            <input
              type="number"
              name={subject}
              value={grades[subject]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>Submit Grades</button>
        <button type="button" onClick={handleFetchResults} style={{marginLeft:"50px"}}>Fetch All Results</button>
      </form>
      <div>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index}>
              <p>Score: {result.score}, Grade: {result.grade}</p>
            </div>
          ))
        ) : (
          <p>No results available</p>
        )}
      </div>
    </div>
  );
};

export default StudentGrades;
