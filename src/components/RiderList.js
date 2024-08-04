// src/components/DriverList.js
import React, { useEffect, useState } from 'react';
import { getAllRiders } from '../services/apiService';
import { Table, Container, Alert } from 'react-bootstrap';

const RiderList = () => {
  const [riders, setRiders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await getAllRiders();
        setRiders(response.data);
      } catch (error) {
        setError('Error fetching riders');
      }
    };

    fetchRiders();
  }, []);

  return (
    <Container style={{direction:'rtl'}}>
      <h1 className="my-4">الركاب</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>البريد الالكتروني</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider.id}>
              <td>{index + 1}</td>
              <td>{rider.firstName} {rider.lastName}  </td>
              <td>{rider.email}</td>
              <td>{rider.isActive ? 'Active' : 'Not Active'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RiderList;
