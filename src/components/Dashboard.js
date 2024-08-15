import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { getCounts } from '../services/apiService';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserShield, FaCar, FaRoute ,FaChartLine  } from 'react-icons/fa';

ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalDrivers: 0,
    totalTrips: 0,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await getCounts();
        setCounts(response.data);
      } catch (error) {
        setError('خطأ في جلب البيانات');
      }
    };

    fetchCounts();
  }, []);

  const pieChartData = {
    labels: ['المستخدمين', 'المشرفين', 'السائقين'],
    datasets: [{
      data: [counts.totalUsers, counts.totalAdmins, counts.totalDrivers],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  const lineChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'عدد الرحلات',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const cardStyle = {
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    cursor: 'pointer'
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
  };

  return (
    <Container className="my-4" style={{direction:'rtl'}}>
      <h1 style={{ color: '#4C6DAA', marginBottom: '30px' }}>لوحة التحكم</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-4">
        <Col md={3}>
          <Card 
            style={cardStyle} 
            className="text-white bg-primary"
            onClick={() => navigate('/rider-list')}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>المستخدمين</Card.Title>
                <Card.Text className="display-4">{counts.totalUsers}</Card.Text>
              </div>
              <FaUsers size={50} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card 
            style={cardStyle} 
            className="text-white bg-success"
            onClick={() => navigate('/admin-list')}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>المشرفين</Card.Title>
                <Card.Text className="display-4">{counts.totalAdmins}</Card.Text>
              </div>
              <FaUserShield size={50} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card 
            style={cardStyle} 
            className="text-white bg-warning"
            onClick={() => navigate('/driver-list')}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>السائقين</Card.Title>
                <Card.Text className="display-4">{counts.totalDrivers}</Card.Text>
              </div>
              <FaCar size={50} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card 
            style={cardStyle} 
            className="text-white bg-info"
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>الرحلات</Card.Title>
                <Card.Text className="display-4">{counts.totalTrips}</Card.Text>
              </div>
              <FaRoute size={50} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title style={{ color: '#4C6DAA' }}>توزيع المستخدمين</Card.Title>
              <div style={{ height: '300px', position: 'relative' }}>
                <Pie data={pieChartData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title style={{ color: '#4C6DAA' }}>إحصائيات سريعة</Card.Title>
              <Row className="mt-3">
                <Col xs={6}>
                  <div className="d-flex align-items-center mb-3">
                    <FaChartLine size={20} className="me-2" style={{ color: '#4C6DAA' }} />
                    <div>
                      <div className="text-muted">معدل النمو الشهري</div>
                      <div className="h4">5%</div>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center mb-3">
                    <FaUsers size={20} className="me-2" style={{ color: '#4C6DAA' }} />
                    <div>
                      <div className="text-muted">مستخدمين جدد (الشهر الحالي)</div>
                      <div className="h4">120</div>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <FaCar size={20} className="me-2" style={{ color: '#4C6DAA' }} />
                    <div>
                      <div className="text-muted">متوسط الرحلات اليومية</div>
                      <div className="h4">250</div>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <FaRoute size={20} className="me-2" style={{ color: '#4C6DAA' }} />
                    <div>
                      <div className="text-muted">إجمالي المسافة المقطوعة (كم)</div>
                      <div className="h4">15,000</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;