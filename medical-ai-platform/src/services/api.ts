import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1', // Placeholder, adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// You might add interceptors for token handling here later
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('authToken'); // Example
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
