require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Joi = require('joi'); // For input validation
const mongoose = require('mongoose'); // For database integration
const morgan = require('morgan'); // For logging

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://your-frontend-domain.com' })); // Restrict CORS
app.use(morgan('tiny'));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Grade schema and model
const gradeSchema = new mongoose.Schema({
  scores: [Number], // Array of scores
  grades: [String], // Array of corresponding grades
  date: { type: Date, default: Date.now },
});

const Grade = mongoose.model('Grade', gradeSchema);

// Utility function
const convertGrade = (score) => {
  if (score >= 95) return 'O';
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C+';
  if (score >= 55) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

// Input validation schema (for exactly 6 scores)
const scoreSchema = Joi.array().items(Joi.number().min(0).max(100)).length(6).required();

// API Endpoints
app.post('/api/convert', async (req, res) => {
  const { scores } = req.body;

  // Validate input
  const { error } = scoreSchema.validate(scores);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Convert scores to grades
  const grades = scores.map((score) => convertGrade(score));

  try {
    // Save scores and grades to the database
    const newGrade = new Grade({ scores, grades });
    await newGrade.save();

    res.json({ scores, grades });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/api/results', async (req, res) => {
  try {
    // Fetch the latest 5 grade entries
    const latestResults = await Grade.find().sort({ date: -1 }).limit(5);
    res.json({ results: latestResults });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
