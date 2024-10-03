// src/services/assignService.js

import axios from './api';

export const assignCourseToEmployee = async (employeeId, courseId) => {
  try {
    const response = await axios.post(`/admin/assign-course`, {
      employeeId,
      courseId,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const assignLearningPathToEmployee = async (employeeId, learningPathId) => {
  try {
    const response = await axios.post(`/admin/assign-learning-path`, {
      employeeId,
      learningPathId,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
