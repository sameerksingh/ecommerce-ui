// httpClient.js

import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api'; // Your backend API base URL

const httpClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // You can add other default headers here if needed
  }
});

// Request interceptor to add bearer token to requests
httpClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set bearer token header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default httpClient;
