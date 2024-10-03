// src/components/Admin/EmployeeManagement.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import api from '../../services/api';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/users');
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { ...form, role: 'EMPLOYEE' });
      fetchEmployees();
      setForm({ name: '', email: '', password: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create employee.');
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setForm({ name: employee.name, email: employee.email, password: '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editingId}`, { ...form });
      fetchEmployees();
      setForm({ name: '', email: '', password: '' });
      setEditingId(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update employee.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchEmployees();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete employee.');
      }
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={editingId ? handleUpdate : handleCreate}>
        <Form.Group controlId="employeeName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter employee name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="employeeEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter employee email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {!editingId && (
          <Form.Group controlId="employeePassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter employee password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit" className="me-2">
          {editingId ? 'Update' : 'Create'} Employee
        </Button>
        {editingId && (
          <Button
            variant="secondary"
            onClick={() => {
              setEditingId(null);
              setForm({ name: '', email: '', password: '' });
              setError('');
            }}
          >
            Cancel
          </Button>
        )}
      </Form>

      <h3 className="mt-5">Employees List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(emp)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeManagement;
