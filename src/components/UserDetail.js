import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/apiService';
import { Container, Alert } from 'react-bootstrap';


const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user details');
      }
    };

    fetchUser();
  }, [id]);

  return (
    <Container className="my-4" style={{direction:'rtl', alignItems: 'center'}}>
      <h1>تفاصيل المستخدم</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {user && (
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5 position-relative">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={ "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                  alt="User Profile"
                />
                {user.isOnline && <span className="online-badge"></span>}
                <span className="font-weight-bold">{user.firstName} {user.lastName}</span>
                <span className="text-black-50">{user.email}</span>
                <span>عدد الرحلات : {user.totalTrips}</span>
                <span>التقييم: {user.rating}</span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                {/* <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div> */}
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">الاسم الاول</label>
                    <input type="text" className="form-control" value={user.firstName} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">الاسم الاخير</label>
                    <input type="text" className="form-control" value={user.lastName} readOnly />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">رقم الهاتف</label>
                    <input type="text" className="form-control" value={user.phoneNumber} readOnly />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">البريد الالكتروني</label>
                    <input type="text" className="form-control" value={user.email} readOnly />
                  </div>
                 
                  <div className="col-md-12">
                    <label className="labels">المقاعد المتاحة</label>
                    <input type="text" className="form-control" value={user.availableSeats} readOnly />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">المقاعد المحجوزة</label>
                    <input type="text" className="form-control" value={user.reservedSeats} readOnly />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels">موديل المركبة</label>
                    <input type="text" className="form-control" value={user.carModel} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">سنة اصدار المركبة</label>
                    <input type="text" className="form-control" value={user.carYear} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">لون المركبة</label>
                    <input type="text" className="form-control" value={user.carColor} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">لوحة المركبة</label>
                    <input type="text" className="form-control" value={user.numberPlate} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">الحالة</label>
                    <input type="text" className="form-control" value={user.isApproved} readOnly />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary profile-button" type="button">حفظ الصفحة</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserDetails;
