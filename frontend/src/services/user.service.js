import axios from 'axios';
import axiosInstance from './axiosInstance';
const API_URL = '/api/users';

const getUsers = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const updateUserRole = async (userId, newRole) => {
  const response = await axiosInstance.put(`${API_URL}/premium/${userId}`);
  return response.data;
};

const deleteInactiveUsers = async () => {
  const response = await axiosInstance.delete(API_URL);
  return response.data;
};

export { getUsers, updateUserRole, deleteInactiveUsers };
