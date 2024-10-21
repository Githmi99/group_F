// routes/helpCenter.js
const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');

// POST endpoint to submit a question
router.post('/help/submit-question', helpController.submitQuestion);
// POST endpoint to submit an answer to a question
router.post('/help/submit-answer', helpController.submitAnswer);
// GET endpoint to fetch all questions with answers
router.get('/help/questions', async (req, res) => {
    try {
      const questions = await Question.find().populate('user').populate('answers.user');
      res.status(200).json(questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
  });
  
module.exports = router;
