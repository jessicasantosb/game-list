import axios from 'axios';

let logoutFn = () => {
  localStorage.deleteItem('accessToken');
  localStorage.deleteItem('refreshToken');
  window.location.href = '/login';
};

export const setLogoutFunction = (fn: () => void) => {
  logoutFn = fn;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8888',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('loggedin') || 'null');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
