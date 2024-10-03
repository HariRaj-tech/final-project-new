// src/components/Admin/AssignCourse.js

import React, { useState, useEffect } from 'react';
import { assignCourseToEmployee } from '../../services/assignService';
import { getAllEmployees } from '../../services/userService';
import { getAllCourses } from '../../services/courseService';

const AssignCourse = () => {
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empData = await getAllEmployees();
        setEmployees(empData);
        const courseData = await getAllCourses();
        setCourses(courseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    try {
      await assignCourseToEmployee(selectedEmployee, selectedCourse);
      setMessage('Course assigned successfully!');
      // Optionally reset selections
      setSelectedEmployee('');
      setSelectedCourse('');
    } catch (error) {
      setMessage(`Error: ${error.message || 'Assignment failed.'}`);
    }
  };

  return (
    <div className="assign-course-container">
      <h2>Assign Course to Employee</h2>
      {message && <p>{message}</p>}
      <div>
        <label>Employee:</label>
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Course:</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssign} disabled={!selectedEmployee || !selectedCourse}>
        Assign Course
      </button>
    </div>
  );
};

export default AssignCourse;
