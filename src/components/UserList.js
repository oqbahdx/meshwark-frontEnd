// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../services/apiService';
import { Table, Container, Alert } from 'react-bootstrap';

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

  return (
    <Container style={{ direction: 'rtl' }} >
      <h1 className="my-4">المستخدمين</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>البريد الالكتروني</th>
            <th>الدور</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} onClick={() => handleRowClick(user.id)} style={{ cursor: 'pointer' }}>
              <td>{index + 1}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'مفعل':'غير مفعل'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersList;
