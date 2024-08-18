import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [results, setResults] = useState([]);

  const handleFetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching results', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleFetchResults}>Fetch All Results</button>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <p>Score: {result.score}, Grade: {result.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
