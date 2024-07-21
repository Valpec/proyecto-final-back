import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  withCredentials: true, 
});

// axiosInstance.interceptors.request.use(config => {
//   const token = localStorage.getItem('jwtToken');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      return Promise.reject({ message: 'Unauthorized', ...error.response });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
