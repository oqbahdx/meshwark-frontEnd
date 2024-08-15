import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/apiService";
import { Container, Alert, Button, Card, Form, Row, Col, Badge } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaCar, FaCalendar, FaPalette, FaIdCard } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isApproved, setIsApproved] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
        setIsApproved(response.data.isApproved);
      } catch (error) {
        setError("Error fetching user details");
      }
    };

    fetchUser();
  }, [id]);

  const handleApprovalChange = (event) => {
    const newApprovalStatus = event.target.value === "true";
    setIsApproved(newApprovalStatus);
  };

  const handleSave = async () => {
    try {
      await updateUser(user.id, { isApproved });
      // Optionally handle success response
    } catch (error) {
      console.error("Failed to update user approval status:", error);
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <div>Loading...</div>;

  return (
    <Container className="my-4" style={{ direction: "rtl" }}>
      <h1 className="text-primary mb-4">تفاصيل المستخدم</h1>
      <Card className="shadow border-0">
        <Card.Body>
          <Row>
            <Col md={4} className="text-center mb-4">
              <img
                className="rounded-circle img-thumbnail"
                width="200"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="User Profile"
              />
              {user.isOnline && <Badge bg="success" className="position-absolute top-0 end-0 p-2 rounded-circle">Online</Badge>}
              <h3 className="mt-3 text-primary">{user.firstName} {user.lastName}</h3>
              <p className="text-muted">{user.email}</p>
              <div className="mt-3">
                <Badge bg="info" className="me-2">عدد الرحلات: {user.totalTrips}</Badge>
                <Badge bg="warning" text="dark">التقييم: {user.rating}</Badge>
              </div>
            </Col>
            <Col md={8}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaUser className="me-2" />الاسم الاول</Form.Label>
                      <Form.Control type="text" value={user.firstName} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaUser className="me-2" />الاسم الاخير</Form.Label>
                      <Form.Control type="text" value={user.lastName} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label><FaPhone className="me-2" />رقم الهاتف</Form.Label>
                  <Form.Control type="text" value={user.phoneNumber} readOnly />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FaEnvelope className="me-2" />البريد الالكتروني</Form.Label>
                  <Form.Control type="text" value={user.email} readOnly />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>المقاعد المتاحة</Form.Label>
                      <Form.Control type="text" value={user.availableSeats} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>المقاعد المحجوزة</Form.Label>
                      <Form.Control type="text" value={user.reservedSeats} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label><FaCar className="me-2" />موديل المركبة</Form.Label>
                  <Form.Control type="text" value={user.carModel} readOnly />
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaCalendar className="me-2" />سنة اصدار المركبة</Form.Label>
                      <Form.Control type="text" value={user.carYear} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaPalette className="me-2" />لون المركبة</Form.Label>
                      <Form.Control type="text" value={user.carColor} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaIdCard className="me-2" />لوحة المركبة</Form.Label>
                      <Form.Control type="text" value={user.numberPlate} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>الحالة</Form.Label>
                  <Form.Select
                    value={isApproved}
                    onChange={handleApprovalChange}
                  >
                    <option value="true">Approved</option>
                    <option value="false">Not Approved</option>
                  </Form.Select>
                </Form.Group>
                <div className="text-center mt-4">
                  <Button variant="primary" size="lg" onClick={handleSave}>
                    حفظ الصفحة
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDetails;