import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7217/api', // Replace with your API base URL
});

// Intercept requests to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/update/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const updateDriverTrip = (id, data) => api.put(`/users/updateDriverTrip/${id}`, data);
export const getAllDrivers = () => api.get('/users/drivers');
export const loginUser = (data) => api.post('/users/login', data);
export const registerUser = (data) => api.post('/users/register', data);
export const getCounts = () => api.get('/users/count');
export const getAllAdmins = () => api.get('/users/admins');
export const getAllRiders = () => api.get('/users/riders');

export default api;
