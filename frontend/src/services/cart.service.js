import axios from 'axios';
import axiosInstance from './axiosInstance';
const API_URL = 'http://localhost:8080/api/carts';

export const createCart = async () => {
  const response = await axiosInstance.post(`${API_URL}`);
  return response.data;
};
export const getCartById = async (cartId) => {
  const response = await axiosInstance.get(`${API_URL}/${cartId}`);
  return response.data;
};

export const addToCart = async (cartId, productId) => {
  const response = await axiosInstance.post(`${API_URL}/${cartId}/product/${productId}`);
  return response.data;
};

export const deleteFromCart = async (cartId, productId) => {
  const response = await axiosInstance.delete(`${API_URL}/${cartId}/product/${productId}`);
  return response.data;
};

export const clearCart = async (cartId) => {
  const response = await axiosInstance.delete(`${API_URL}/${cartId}`);
  return response.data;
};

export const updateCart = async (cartId, cart) => {
  const response = await axiosInstance.put(`${API_URL}/${cartId}`, cart);
  return response.data;
};

export const updateCartQty = async (cartId, productId, quantity) => {
  const response = await axiosInstance.put(`${API_URL}/${cartId}/product/${productId}`, { qty: quantity });
  return response.data;
};

export const purchaseCart = async (cartId) => {
  const response = await axiosInstance.get(`${API_URL}/${cartId}/purchase`);
  return response.data;
};
