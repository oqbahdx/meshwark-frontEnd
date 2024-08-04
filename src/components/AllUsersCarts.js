import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../services/apiService';
import { Table, Container, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/users/${id}`);
  };

  // Prepare data for the bar chart
  const roles = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const roleColors = {
    rider: 'rgba(54, 162, 235, 0.2)', // Blue
    driver: 'rgba(255, 99, 132, 0.2)', // Red
  };

  const borderColor = {
    rider: 'rgba(54, 162, 235, 1)', // Blue
    driver: 'rgba(255, 99, 132, 1)', // Red
  };

  const data = {
    labels: Object.keys(roles),
    datasets: [
      {
        label: 'Number of Users',
        data: Object.values(roles),
        backgroundColor: Object.keys(roles).map(role => roleColors[role] || 'rgba(75, 192, 192, 0.2)'),
        borderColor: Object.keys(roles).map(role => borderColor[role] || 'rgba(75, 192, 192, 1)'),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <h1 className="my-4">Users List</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Bar data={data} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} onClick={() => handleRowClick(user.id)} style={{ cursor: 'pointer' }}>
              <td>{index + 1}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Approved':'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersList;
