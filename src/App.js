// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from '../src/components/Login';
import RegisterForm from '../src/components/Register';
import DriverList from '../src/components/DriverList';
import UserList from '../src/components/UserList';
import UserDetails from './components/UserDetail';
import AllUsersCarts from '../src/components/AllUsersCarts';
import Intro from './components/Intro';
import AdminList from '../src/components/AdminList';
import RiderList from '../src/components/RiderList';
import ProtectedRoute from '../src/services/ProtectedRoute';
import PrivacyPolicy from '../src/components/PrivacyPolicy';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ direction: 'rtl' }}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">الرئسية</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/driver-list">السائقين</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-list">المستخدمين</Link>
                                </li>
                               
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">تسجيل الدخول</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">انشاء حساب</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/privacy-policy">سياسة الخصوصية</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Intro/>} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/rider-list" element={<RiderList />} />
                    <Route path="/admin-list" element={<AdminList />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route
                        path="/driver-list"
                        element={
                            <ProtectedRoute>
                                <DriverList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user-list"
                        element={
                            <ProtectedRoute>
                                <UserList />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
