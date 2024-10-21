// helpController.js
const Question = require('../models/question'); // Import the Question model
const User = require('../models/User'); // Import the User model (if needed for user validation)

// Submit a question
exports.submitQuestion = async (req, res) => {
  // Extract the question from the request body
  const { question } = req.body;

  // Validate that the question is provided
  if (!question || typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json({ message: 'Question is required and must be a non-empty string.' });
  }

  // Create a new Question instance
  const newQuestion = new Question({
    question: question.trim(), // Trim whitespace from the question
    user: req.user ? req.user.id : null, // Handle user authentication, use null if not authenticated
  });

  try {
    // Save the new question to the database
    const savedQuestion = await newQuestion.save();
    console.log('Saved Question:', savedQuestion); // Log the saved question
    res.status(201).json({ message: 'Question submitted successfully', question: savedQuestion });
  } catch (err) {
    console.error('Error submitting question:', err); // Log the error details
    // Send an appropriate error response
    res.status(500).json({ message: 'Error submitting question', error: err.message });
  }
};

// Submit an answer to a question
exports.submitAnswer = async (req, res) => {
  const { questionId, answer } = req.body;

  if (!answer || typeof answer !== 'string' || answer.trim() === '') {
    return res.status(400).json({ message: 'Answer is required and must be a non-empty string.' });
  }

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    const newAnswer = {
      answer: answer.trim(),
      user: req.user ? req.user.id : null, // Use authenticated user ID, or null if not authenticated
    };

    question.answers.push(newAnswer); // Add the answer to the question's answer array
    await question.save();

    res.status(201).json({ message: 'Answer submitted successfully', question });
  } catch (err) {
    console.error('Error submitting answer:', err);
    res.status(500).json({ message: 'Error submitting answer', error: err.message });
  }
};
