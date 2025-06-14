import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from '../src/components/Login';
import RegisterForm from '../src/components/Register';
import DriverList from '../src/components/DriverList';
import UserList from '../src/components/UserList';
import UserDetails from './components/UserDetail';
import AllUsersCarts from '../src/components/AllUsersCarts';
import Home from './components/Home';
import AdminList from '../src/components/AdminList';
import RiderList from '../src/components/RiderList';
import ProtectedRoute from '../src/services/ProtectedRoute';
import PrivacyPolicy from '../src/components/PrivacyPolicy';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if token is in local storage
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#FFFFFF', direction: 'rtl' }}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/" style={{ color: '#4C6DAA' }}>الرئسية</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {isAuthenticated && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/driver-list" style={{ color: '#4C6DAA' }}>السائقين</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/dashboard" style={{ color: '#4C6DAA' }}>لوحة التحكم</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/user-list" style={{ color: '#4C6DAA' }}>المستخدمين</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/rider-list" style={{ color: '#4C6DAA' }}>الركاب</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin-list" style={{ color: '#4C6DAA' }}>الإداريين</Link>
                                        </li>
                                    </>
                                )}
                                {!isAuthenticated && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login" style={{ color: '#4C6DAA' }}>تسجيل الدخول</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register" style={{ color: '#4C6DAA' }}>انشاء حساب</Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/privacy-policy" style={{ color: '#4C6DAA' }}>سياسة الخصوصية</Link>
                                </li>
                                {isAuthenticated && (
                                    <li className="nav-item">
                                        <button className="btn btn-link nav-link" onClick={handleLogout} style={{ color: '#4C6DAA' }}>تسجيل الخروج</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/rider-list" element={<ProtectedRoute><RiderList /></ProtectedRoute>} />
                    <Route path="/admin-list" element={<ProtectedRoute><AdminList /></ProtectedRoute>} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route path="/driver-list" element={<ProtectedRoute><DriverList /></ProtectedRoute>} />
                    <Route path="/user-list" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
