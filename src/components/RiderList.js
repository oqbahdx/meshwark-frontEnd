// src/components/RiderList.js
import React, { useEffect, useState } from 'react';
import { getAllRiders } from '../services/apiService';
import { Table, Container, Alert, Badge } from 'react-bootstrap';

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
    <Container style={{ direction: 'rtl' }}>
      <h1 className="my-4" style={{ color: '#4C6DAA' }}>الركاب</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table responsive bordered hover>
        <thead style={{ backgroundColor: '#4C6DAA', color: 'white' }}>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>البريد الالكتروني</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider.id} style={{ backgroundColor: index % 2 === 0 ? '#F8F9FA' : 'white' }}>
              <td>{index + 1}</td>
              <td>{rider.firstName} {rider.lastName}</td>
              <td>{rider.email}</td>
              <td>
                <Badge bg={rider.isActive ? 'success' : 'danger'}>
                  {rider.isActive ? 'مفعل' : 'غير مفعل'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RiderList;