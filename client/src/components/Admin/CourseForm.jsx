// src/components/Admin/CourseForm.jsx

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const CourseForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('EASY');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', { title, duration: Number(duration), difficultyLevel });
      onSuccess();
      setTitle('');
      setDuration('');
      setDifficultyLevel('EASY');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create course.');
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="courseTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="courseDuration" className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="courseDifficulty" className="mb-3">
          <Form.Label>Difficulty Level</Form.Label>
          <Form.Select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            required
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Course
        </Button>
      </Form>
    </div>
  );
};

export default CourseForm;
