// src/components/HelpCenter.js
import React, { useState, useEffect } from 'react';
import './HelpCenter.css';
import Header from './Header';
import axios from 'axios';
import { useSubmitQuestionMutation, useSubmitAnswerMutation } from '../services/api';

const HelpCenter = () => {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]); // To store all questions with answers
  const [answer, setAnswer] = useState(''); // Track current answer input
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitQuestion] = useSubmitQuestionMutation();
  const [submitAnswer] = useSubmitAnswerMutation();

  useEffect(() => {
    // Fetch all questions with answers on component mount
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/api/help/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (!question) {
      setError('Please enter a question.');
      return;
    }

    setError('');
    try {
      const result = await submitQuestion(question).unwrap();
      setSuccess(result.message);
      setQuestion('');
      setQuestions((prevQuestions) => [...prevQuestions, result.question]); // Update the question list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitAnswer = async (e, questionId) => {
    e.preventDefault();

    if (!answer) {
      setError('Please enter an answer.');
      return;
    }

    try {
      const result = await submitAnswer({ questionId, answer }).unwrap();
      setSuccess(result.message);
      setAnswer('');
      // Update the relevant question with the new answer
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId ? { ...q, answers: result.question.answers } : q
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="helpcenter-page-container">
      <Header title="Center" titlePrefix="Help" />
      <form onSubmit={handleSubmitQuestion}>
        <div>
          <h3><label>Question:</label></h3>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
            rows="4"
            required
          />
        </div>
        <button type="submit">Submit Question</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Display all questions with answers */}
      <div className="questions-container">
        {questions.map((q) => (
          <div key={q._id} className="question-box">
            <h4>{q.question}</h4>
            <p>Asked by: {q.user?.name || 'Anonymous'}</p>

            {/* Display answers */}
            {q.answers && q.answers.length > 0 && (
              <div className="answers-container">
                <h5>Answers:</h5>
                {q.answers.map((a, index) => (
                  <div key={index} className="answer-box">
                    <p>{a.answer}</p>
                    <small>Answered by: {a.user?.name || 'Anonymous'}</small>
                  </div>
                ))}
              </div>
            )}

            {/* Answer input box */}
            <form onSubmit={(e) => handleSubmitAnswer(e, q._id)}>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer here..."
                rows="3"
              />
              <button type="submit">Submit Answer</button>
            </form>
          </div>
        ))}

        {/* Predefined Questions and Answers */}
        <div className="predefined-qa">
          <h3>Frequently Asked Questions</h3>
          <div className="question-box">
            <h4>1. How can I reset my password?</h4>
            <p>To reset your password, click on 'Forgot Password' on the login page and follow the instructions.</p>
          </div>
          <div className="question-box">
            <h4>2. Where can I find my order history?</h4>
            <p>You can view your order history in the 'My Orders' section of your account dashboard.</p>
          </div>
          <div className="question-box">
            <h4>3. How do I contact customer support?</h4>
            <p>You can reach customer support by emailing support@example.com or calling our helpline at 123-456-7890.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
