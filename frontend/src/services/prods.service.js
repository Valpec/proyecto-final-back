import axios from 'axios';
import axiosInstance from './axiosInstance';
const URL_PRODUCTOS = 'http://localhost:8080/api/products';

const obtenerProductos = async (categoriaId, page, limit = 10, sort = 'asc') => {
    try {
        let response = await axiosInstance.get(categoriaId ? `${URL_PRODUCTOS}?query=${categoriaId}&page=${page}&limit=${limit}&sort=${sort}` : `${URL_PRODUCTOS}?page=${page}&limit=${limit}&sort=${sort}`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
const obtenerProductoId = async (itemId) => {
    try {
        let response = await axios.get(`${URL_PRODUCTOS}/${itemId}`);
        console.log(response.data)
        return response.data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
export default { obtenerProductos , obtenerProductoId};
