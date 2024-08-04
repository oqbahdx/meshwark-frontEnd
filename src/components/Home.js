import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { getCounts , getAllAdmins , getAllRiders} from '../services/apiService';
import '../styles/Home.css'; // Import the CSS file
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalDrivers: 0,
    totalTrips: 0,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await getCounts();
        setCounts(response.data);
      } catch (error) {
        setError('Error fetching counts');
      }
    };

    fetchCounts();
  }, []);

  const chartData = {
    labels: ['المستخدمين', 'المشرفين', 'الساقين'],
    datasets: [{
      data: [counts.totalUsers, counts.totalAdmins, counts.totalDrivers],
      backgroundColor: ['#f8d7da', '#d4edda', '#d1ecf1'], // Blue, Green, Red
      borderColor: ['#f5c6cb', '#c3e6cb', '#bee5eb'],
      hoverOffset: 4
    }]
  };

  return (
    <Container className="my-4" style={{direction:'rtl'}}>
      <h1>لوحة التحكم</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={3}>
          <Card className="card-users" onClick={() => navigate('/rider-list')}>
            <Card.Body>
              <Card.Title>المستخدمين</Card.Title>
              <Card.Text>{counts.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="card-admins" onClick={() => navigate('/admin-list')}>
            <Card.Body>
              <Card.Title>المشرفين</Card.Title>
              <Card.Text>{counts.totalAdmins}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="card-drivers"  onClick={() => navigate('/driver-list')} >
            <Card.Body>
              <Card.Title>السايقين</Card.Title>
              <Card.Text>{counts.totalDrivers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="card-trips">
            <Card.Body>
              <Card.Title>الرحلات</Card.Title>
              <Card.Text>{counts.totalTrips}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Container>
      <Row className="justify-content-center" style={{ height: '100vh', alignItems: 'center' }}>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>التوزيع</Card.Title>
              <Pie data={chartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
      </Row>
     
    </Container>
  );
};

export default Home;
