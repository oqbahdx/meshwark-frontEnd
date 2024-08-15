import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../services/apiService'; // Import the loginUser function
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../styles/LoginForm.css'; // Import the updated CSS

const LoginForm = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.token); // Store token in local storage
      setIsAuthenticated(true); // Update authentication state
      Swal.fire('نجاح', 'تم تسجيل الدخول بنجاح', 'success');
      navigate('/home'); // Redirect to the dashboard or home page after login
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
              <h3 className="card-title text-center">تسجيل الدخول</h3>
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
                <button type="submit" className="btn btn-primary w-100">تسجيل الدخول</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
