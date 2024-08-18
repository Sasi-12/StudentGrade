const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const grades = []; // Store grades here

const convertGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

app.post('/api/convert', (req, res) => {
  const { scores } = req.body;
  const results = scores.map(score => ({
    score,
    grade: convertGrade(score)
  }));
  grades.push(...results); // Store results
  res.json({ results });
});

app.get('/api/results', (req, res) => {
  // Return only the latest 5 results
  const latestResults = grades.slice(-5);
  res.json({ results: latestResults });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
