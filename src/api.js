// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getProveedores = async () => {
  try {
    const response = await api.get('/proveedor');
    return response.data;
  } catch (error) {
    console.error('Error fetching proveedores:', error);
    throw error;
  }
};

export const addProveedor = async (nuevoProveedor) => {
  try {
    const response = await api.post('/proveedor', nuevoProveedor);
    return response.data;
  } catch (error) {
    console.error('Error adding proveedor:', error);
    throw error;
  }
};
