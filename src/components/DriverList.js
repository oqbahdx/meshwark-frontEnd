// src/components/DriverList.js
import React, { useEffect, useState } from 'react';
import { getAllDrivers } from '../services/apiService';
import { Table, Container, Alert, Badge } from 'react-bootstrap';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getAllDrivers();
        setDrivers(response.data);
      } catch (error) {
        setError('Error fetching drivers');
      }
    };

    fetchDrivers();
  }, []);

  return (
    <Container style={{ direction: 'rtl' }}>
      <h1 className="my-4" style={{ color: '#4C6DAA' }}>السائقين</h1>
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
          {drivers.map((driver, index) => (
            <tr key={driver.id} style={{ backgroundColor: index % 2 === 0 ? '#F8F9FA' : 'white' }}>
              <td>{index + 1}</td>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.email}</td>
              <td>
                <Badge bg={driver.isActive ? 'success' : 'danger'}>
                  {driver.isActive ? 'مفعل' : 'غير مفعل'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DriverList;