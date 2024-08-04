// src/components/DriverList.js
import React, { useEffect, useState } from 'react';
import { getAllAdmins } from '../services/apiService';
import { Table, Container, Alert } from 'react-bootstrap';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAllAdmins();
        setAdmins(response.data);
      } catch (error) {
        setError('Error fetching admins');
      }
    };

    fetchAdmins();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Admin List</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{index + 1}</td>
              <td>{admin.firstName} {admin.lastName}  </td>
              <td>{admin.email}</td>
              <td>{admin.isActive ? 'Active' : 'Not Active'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminList;
