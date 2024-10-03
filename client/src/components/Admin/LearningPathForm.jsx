// src/components/Admin/LearningPathForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const LearningPathForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses.');
      }
    };
    fetchCourses();
  }, []);

  const handleCourseSelect = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(Number(options[i].value));
      }
    }
    setSelectedCourses(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      setError('Please select at least one course.');
      return;
    }
    try {
      await api.post('/learning-paths', { title, description, courseIds: selectedCourses });
      onSuccess();
      setTitle('');
      setDescription('');
      setSelectedCourses([]);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create learning path.');
    }
  };

  return (
    <div>
      <h2>Create Learning Path</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="pathTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter learning path title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="pathDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="pathCourses" className="mb-3">
          <Form.Label>Select Courses</Form.Label>
          <Form.Control as="select" multiple value={selectedCourses} onChange={handleCourseSelect} required>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Learning Path
        </Button>
      </Form>
    </div>
  );
};

export default LearningPathForm;
