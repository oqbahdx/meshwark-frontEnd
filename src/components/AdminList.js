// src/components/AdminList.js
import React, { useEffect, useState } from 'react';
import { getAllAdmins } from '../services/apiService';
import { Table, Container, Alert, Badge } from 'react-bootstrap';

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
      <h1 className="my-4" style={{ color: '#4C6DAA' }}>قائمة المشرفين</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table responsive bordered hover>
        <thead style={{ backgroundColor: '#4C6DAA', color: 'white' }}>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id} style={{ backgroundColor: index % 2 === 0 ? '#F8F9FA' : 'white' }}>
              <td>{index + 1}</td>
              <td>{admin.firstName} {admin.lastName}</td>
              <td>{admin.email}</td>
              <td>
                <Badge bg={admin.isActive ? 'success' : 'danger'}>
                  {admin.isActive ? 'مفعل' : 'غير مفعل'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminList;