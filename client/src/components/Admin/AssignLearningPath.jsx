// src/components/Admin/AssignLearningPath.js

import React, { useState, useEffect } from 'react';
import { assignLearningPathToEmployee } from '../../services/assignService';
import { getAllEmployees } from '../../services/userService';
import { getAllLearningPaths } from '../../services/learningPathService';

const AssignLearningPath = () => {
  const [employees, setEmployees] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empData = await getAllEmployees();
        setEmployees(empData);
        const lpData = await getAllLearningPaths();
        setLearningPaths(lpData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    try {
      await assignLearningPathToEmployee(selectedEmployee, selectedLearningPath);
      setMessage('Learning Path assigned successfully!');
      // Optionally reset selections
      setSelectedEmployee('');
      setSelectedLearningPath('');
    } catch (error) {
      setMessage(`Error: ${error.message || 'Assignment failed.'}`);
    }
  };

  return (
    <div className="assign-learning-path-container">
      <h2>Assign Learning Path to Employee</h2>
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
        <label>Learning Path:</label>
        <select value={selectedLearningPath} onChange={(e) => setSelectedLearningPath(e.target.value)}>
          <option value="">Select Learning Path</option>
          {learningPaths.map((lp) => (
            <option key={lp.id} value={lp.id}>
              {lp.title}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssign} disabled={!selectedEmployee || !selectedLearningPath}>
        Assign Learning Path
      </button>
    </div>
  );
};

export default AssignLearningPath;
