import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerUser } from '../services/apiService'; // Import the registerUser function
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../styles/LoginForm.css';

const Register = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    password: '',
    role: 'Rider', // Default role, changeable to 'Driver' 'Admin'
    isApproved: false,
    fcmToken: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      Swal.fire('نجاح', 'تم تسجيل المستخدم بنجاح', 'success');
      navigate('/login'); // Redirect to login page after registration
    } catch (error) {
      Swal.fire('خطأ', error.response?.data || 'حدث خطأ', 'error');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5" style={{ direction: 'rtl' }}>
            <div className="card-body">
              <div className="header">
                <div className="header-left">مشوارك</div>
                <div className="header-right">
                  <img src={logo} alt="Logo" className="logo" />
                </div>
              </div>
              <h3 className="card-title text-center">أنشاء حساب</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">رقم الهاتف</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">كلمة المرور</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">الدور</label>
                  <select
                    id="role"
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="Rider">راكب</option>
                    <option value="Driver">سائق</option>
                    <option value="Admin">مشرف</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="fcmToken" className="form-label">FCM رمز</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fcmToken"
                    name="fcmToken"
                    value={formData.fcmToken}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">تسجيل</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
