import axios from 'axios';
import axiosInstance from './axiosInstance'
import Cookies from 'js-cookie'
  
export const login = async (email, password) => {
  const response = await axiosInstance.post('/api/sessions/login', { email, password });
  console.log('repsonse de loghin', response.data)
  return response.data;
};

export const register = async ({ firstName, lastName, age, email, password }) => {
  const response = await axiosInstance.post('/api/sessions/register', { firstName, lastName, age, email, password });
  return response.data;
};

export const logout = async() => {
  await axios.get('/api/sessions/logout');
  localStorage.removeItem('user');
};

export const isAuthenticatedBool = async() => {
  return !!Cookies.get('jwtCookieToken'); 
}
